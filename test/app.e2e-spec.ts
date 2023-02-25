// import 'dotenv/config';
// import * as request from 'supertest';
// import * as mongoose from 'mongoose';
// import { LoginDto, RegisterDto } from 'src/auth/auth.dto';
// import { HttpStatus } from '@nestjs/common';

// const app = 'http://localhost:3000';

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGO_URI);
//   await mongoose.connection.db.dropDatabase();
// });

// afterAll((done) => {
//   mongoose.disconnect(done);
// });

// describe('ROOT', () => {
//   it('should ping', () => {
//     return request(app).get('/').expect(200).expect('Hello World!');
//   });
// });

// describe('Auth', () => {
//   it('should register', () => {
//     const user: RegisterDto = {
//       username: 'username',
//       password: 'password',
//     };

//     return request(app)
//       .post('/auth/register')
//       .set('Accept', 'application.json')
//       .send(user)
//       .expect(({ body }) => {
//         expect(body.token).toBeDefined();
//         expect(body.user.username).toEqual('username');
//         expect(body.user.password).toBeUndefined();
//       })
//       .expect(HttpStatus.CREATED);
//   });

//   it('should eject duplicate registration', () => {
//     const user: RegisterDto = {
//       username: 'username',
//       password: 'password',
//     };

//     return request(app)
//       .post('/auth/register')
//       .set('Accept', 'application.json')
//       .send(user)
//       .expect(({ body }) => {
//         expect(body.message).toEqual('user already exist');
//         expect(body.code).toEqual(HttpStatus.BAD_REQUEST);
//       })
//       .expect(HttpStatus.BAD_REQUEST);
//   });

//   it('should login', () => {
//     const user: LoginDto = {
//       username: 'username',
//       password: 'password',
//     };

//     return request(app)
//       .post('/auth/login')
//       .set('Accept', 'application.json')
//       .send(user)
//       .expect(({ body }) => {
//         expect(body.token).toBeDefined();
//         expect(body.user.username).toEqual('username');
//         expect(body.user.password).toBeUndefined();
//       })
//       .expect(HttpStatus.CREATED);
//   });
// });

import 'dotenv/config';
import * as request from 'supertest';
import { app } from './constants';

describe('ROOT', () => {
  it('should ping', () => {
    return request(app).get('/').expect(200).expect('Hello World!');
  });
});
