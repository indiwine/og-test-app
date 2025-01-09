import {
  ArgsType,
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { ProductCategoryDto } from '../../product-category/dtos/product-category.dto';
import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@ObjectType()
export class ProductDto {
  @Field(() => Int, { description: 'Unique identifier of the product' })
  id: number;

  @Field({ description: 'Name of the product' })
  name: string;

  @Field({ description: 'Description of the product', nullable: true })
  description: string;

  @Field(() => Float, { description: 'Price of the product' })
  price: number;

  @Field(() => ProductCategoryDto, { description: 'Category of the product' })
  category: ProductCategoryDto;
}

export type ProductGraphqlResponseDto = ProductDto;
export type ProductOptionalDto = Partial<ProductDto>;

@InputType()
@ArgsType()
export class ProductRequestDto {
  @Field({ description: 'Name of the product' })
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @Field({ description: 'Description of the product', nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description: string;

  @Field(() => Float, { description: 'Price of the product' })
  @Min(0)
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  price: number;

  @Field(() => Int, { description: 'Category of the product' })
  @IsNumber()
  category: number;
}

@InputType()
@ArgsType()
export class FindProductDto {
  @Field(() => Int, { description: 'Unique identifier of the product', nullable: true })
  @IsInt()
  @IsOptional()
  id?: number;

  @Field(() => String, { description: 'Name of the product', nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { description: 'Sort field', nullable: true })
  @IsString()
  @IsOptional()
  sortField?: string = 'id';

  @Field(() => String, { description: 'Sort direction (asc or desc)', nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDirection?: 'asc' | 'desc' = 'desc';
}

export type ProductRequestOptionalDto = Partial<ProductRequestDto>;
