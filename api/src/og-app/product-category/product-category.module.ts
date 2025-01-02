import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { CreateProductCategoryHandler } from './commands/create-product-category/create-product-category.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [],
  providers: [CreateProductCategoryHandler],
})
export class ProductCategoryModule {}
