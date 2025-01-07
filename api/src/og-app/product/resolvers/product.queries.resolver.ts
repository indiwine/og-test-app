import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { FindProductDto, ProductDto } from '../dtos/product.dto';
import { QueryBus } from '@nestjs/cqrs';
import { FindProductQuery } from '../queries/find-product/find-product.query';
import { GraphQLResolveInfo } from 'graphql';
import * as graphqlFields from 'graphql-fields';

@Resolver(() => ProductDto)
export class ProductQueriesResolver {
  constructor(protected readonly queryBus: QueryBus) {}

  @Query(() => [ProductDto], { description: 'Find products' })
  findProducts(
    @Args({
      nullable: true,
      name: 'condition',
      type: () => FindProductDto,
    })
    condition: FindProductDto,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = graphqlFields(info);
    const query = new FindProductQuery(
      condition,
      fields.hasOwnProperty('category'),
    );

    return this.queryBus.execute(query);
  }
}
