import {
  Category,
  ClothingProducts,
  CountryType,
  ElectronicProducts,
  ShoesProduct,
} from '../entity/product.entity';

export class UpdateProductDto {
  category: Category;
  secondCategory: ElectronicProducts | ClothingProducts | ShoesProduct;
  name: string;
  summary: string;
  country: CountryType;
  deadline: Date;
  price: number;
}
