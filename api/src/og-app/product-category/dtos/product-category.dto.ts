import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// In real applications we should move request and response DTOs to a separate file

@ObjectType()
export class ProductCategoryDto {
  @Field(() => ID, { description: 'Unique identifier of the product category' })
  id: number;

  @Field({ description: 'Name of the product category', nullable: false })
  name: string;
}

export type ProductCategoryGraphqlResponseDto = ProductCategoryDto;
export type ProductCategoryOptionalDto = Partial<ProductCategoryDto>;
export type ProductCategoryCreatDto = Omit<ProductCategoryDto, 'id'>;

@ArgsType()
@InputType()
export class ProductCategoryRequestDto {
  @Field({ description: 'Name of the product category', nullable: false })
  @MinLength(5)
  @MaxLength(50)
  name: string;
}

@ArgsType()
@InputType()
export class ProductCategoryFindDto {
  @Field(() => Int, {
    description: 'Unique identifier of the product category',
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  id?: number;

  @Field({ description: 'Name of the product category', nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => [Int], {
    description: 'List of unique identifiers of the product categories',
    nullable: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  @IsOptional()
  ids?: number[];
}
