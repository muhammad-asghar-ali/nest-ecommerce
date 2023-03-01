import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose';
import { RegisterDto } from 'src/auth/auth.dto';
import { CreateProductDto } from 'src/products/product.dto';
import * as request from 'supertest';
import { app, database } from './constants';

let sellerToken: string;
const productSeller: RegisterDto = {
  seller: true,
  username: 'productSeller',
  password: 'password',
};

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();

  const {
    data: { token },
  } = await axios.post(`${app}/auth/register`, productSeller);

  sellerToken = token;
});

afterAll((done) => {
  mongoose.disconnect(done);
});

describe('PRODUCT', () => {
  const product: CreateProductDto = {
    title: 'new phone',
    image: 'n/a',
    description: 'description',
    price: 10,
  };

  let productId: string;

  it('should list all products', () => {
    return request(app).get('/product').expect(200);
  });

  it('should list my products', () => {
    return request(app)
      .get('/product/mine')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(200);
  });

  it('should create product', () => {
    return request(app)
      .post('/product')
      .set('Authorization', `Bearer ${sellerToken}`)
      .set('Accept', 'application/json')
      .send(product)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        productId = body._id;
        expect(body.title).toEqual(product.title);
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.owner.username).toEqual(productSeller.username);
      })
      .expect(HttpStatus.CREATED);
  });

  it('should read product', () => {
    return request(app)
      .get(`/product/${productId}`)
      .expect(({ body }) => {
        expect(body.title).toEqual(product.title);
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.owner.username).toEqual(productSeller.username);
      })
      .expect(200);
  });

  it('should update product', () => {
    return request(app)
      .put(`/product/${productId}`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .set('Accept', 'application/json')
      .send({
        title: 'newTitle',
      })
      .expect(({ body }) => {
        expect(body.title).not.toEqual(product.title);
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.owner.username).toEqual(productSeller.username);
      })
      .expect(200);
  });

  it('should delete product', async () => {
    await axios.delete(`${app}/product/${productId}`, {
      headers: { Authorization: `Bearer ${sellerToken}` },
    });

    return request(app)
      .get(`/product/${productId}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
