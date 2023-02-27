import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from 'src/guards/seller.guard';
import { User as UserDocument } from '../types/user';
import { User } from 'src/utils/user.decorator';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ProductService } from './product.service';
import { Product } from 'src/types/product';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async create(@Body() product: CreateProductDto, @User() user: UserDocument) {
    return this.productService.create(product, user);
  }

  @Get()
  async listAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/mine')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async listMine(@User() user: UserDocument): Promise<Product[]> {
    const { id } = user;
    return await this.productService.findByOwner(id);
  }

  @Get('/seller/:id')
  async listBySeller(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.findByOwner(id);
  }

  @Get(':id')
  async read(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
    @User() user: UserDocument,
  ): Promise<Product> {
    const { id: userId } = user;
    return await this.productService.update(id, product, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async delete(
    @Param('id') id: string,
    @User() user: UserDocument,
  ): Promise<Product> {
    const { id: userId } = user;
    return await this.productService.delete(id, userId);
  }
}
