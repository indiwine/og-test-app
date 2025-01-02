import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductCategoryDto {
  @Field({ description: 'Unique identifier of the product category' })
  id: number;
  @Field({ description: 'Name of the product category', nullable: false })
  name: string;
}

export type ProductCategoryGraphqlResponseDto = ProductCategoryDto;
export type ProductCategoryOptionalDto = Partial<ProductCategoryDto>;
