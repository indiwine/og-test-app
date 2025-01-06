import {
  ProductCategoryDto,
  ProductCategoryFindDto,
} from '../dtos/product-category.dto';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { FindOneProductCategoryQuery } from '../queries/find-one-product-category/find-one-product-category.query';
import { FindProductCategoriesQuery } from '../queries/find-product-categories/find-product-categories.query';

@Resolver(() => ProductCategoryDto)
export class ProductCategoryQueriesResolver {
  constructor(private queryBus: QueryBus) {}

  @Query(() => ProductCategoryDto, {
    nullable: true,
    description: 'Find a product category by id',
  })
  async findOneProductCategory(
    @Args({ name: 'id', type: () => ID }) id: number,
  ) {
    const query = new FindOneProductCategoryQuery(id);
    return await this.queryBus.execute(query);
  }

  @Query(() => [ProductCategoryDto], { description: 'Find product categories' })
  async findProductCategories(
    @Args({
      name: 'condition',
      type: () => ProductCategoryFindDto,
      nullable: true,
    })
    condition: ProductCategoryFindDto,
  ) {
    const queryReq = new FindProductCategoriesQuery(condition);

    return this.queryBus.execute(queryReq);
  }
}
