import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/register')
  async registerProduct(@Body() createProductDto: CreateProductDto) {
    await this.productService.registerProduct(createProductDto);
    return { status: HttpStatus.CREATED, message: '상품 등록 완료' };
  }

  @Patch(':id')
  async editProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productService.editProduct(id, updateProductDto);
    return { status: HttpStatus.OK, message: '상품이 수정 되었습니다.' };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
    return { status: HttpStatus.OK, message: '상품이 삭제 되었습니다.' };
  }

  @Get('/')
  async getProductList() {
    const data = await this.productService.getProductList();
    return { status: HttpStatus.OK, data };
  }

  @Get(':id')
  async getProductDetail(@Param('id') id: string) {
    const data = await this.productService.getProductDetail(id);
    return { status: HttpStatus.OK, data };
  }
}
