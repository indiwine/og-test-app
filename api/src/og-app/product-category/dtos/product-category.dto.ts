import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

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

@ArgsType()
@InputType()
export class ProductCategoryRequestDto {
  @Field({ description: 'Name of the product category', nullable: false })
  @MinLength(5)
  @MaxLength(50)
  name: string;
}

@InputType()
export class ProductCategoryFindDto {
  @Field(() => ID, {
    description: 'Unique identifier of the product category',
    nullable: true,
  })
  id?: number;

  @Field({ description: 'Name of the product category', nullable: true })
  name?: string;

  @Field(() => [ID], {
    description: 'List of unique identifiers of the product categories',
    nullable: true,
  })
  ids?: number[];
}
