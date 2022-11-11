import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

export type Category = '전자제품' | '의류' | '신발';
export type ElectronicProducts = '냉장고' | '티비' | '노트북';
export type ClothingProducts = '상의' | '하의';
export type ShoesProduct = '운동화' | '실내화' | '슬리퍼';
export type CountryType = '한국' | '프랑스' | '가나';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false,
})
export class Product {
  @Prop()
  category: Category;

  @Prop()
  secondCategory: ElectronicProducts | ClothingProducts | ShoesProduct;

  @Prop()
  name: string;

  @Prop()
  summary: string;

  @Prop()
  country: CountryType;

  @Prop({ default: 0 })
  deadline: Date;

  @Prop()
  price: number;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
