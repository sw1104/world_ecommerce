import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async registerProduct(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }

  async editProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);
    if (!product) throw new BadRequestException('상품이 없습니다.');
    return await this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
      })
      .exec();
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new BadRequestException('상품이 없습니다.');
    return await this.productModel.findByIdAndDelete(id);
  }

  async getProductList() {
    return await this.productModel.find();
  }

  async getProductDetail(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new BadRequestException('상품이 없습니다.');
    return await this.productModel.findOne({ id: id });
  }
}
