import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/types/product';
import { User } from 'src/types/user';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private _model: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this._model.find().populate('owner');
  }

  async findByOwner(userId: string): Promise<Product[]> {
    return await this._model.find({ owner: userId }).populate('owner');
  }

  async findOne(id: string): Promise<Product> {
    const product = await this._model.findById(id).populate('owner');
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NO_CONTENT);
    }
    return product;
  }

  async create(productDto: CreateProductDto, user: User): Promise<Product> {
    const product = await this._model.create({
      ...productDto,
      owner: user,
    });
    product.save();
    return product.populate('owner');
  }

  async update(
    id: string,
    productDTO: UpdateProductDto,
    userId: string,
  ): Promise<Product> {
    const product = await this._model.findById(id);
    if (userId !== product.owner.toString()) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await product.update(productDTO);
    return await this._model.findById(id).populate('owner');
  }

  async delete(id: string, userId: string): Promise<Product> {
    const product = await this._model.findById(id);
    if (userId !== product.owner.toString()) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await product.remove();
    return product.populate('owner');
  }
}
