import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductDto, ProductRequestDto } from '../dtos/product.dto';
import { CreateProductCommand } from '../commands/create-product/create-product.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../commands/delete-product/delete-product.command';
import { UpdateProductCommand } from '../commands/update-product/update-product.command';
import { FindOneProductCategoryQuery } from '../../product-category/queries/find-one-product-category/find-one-product-category.query';

@Resolver(() => ProductDto)
export class ProductCommandsResolver {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Mutation(() => ProductDto, { description: 'Create a new product' })
  createProduct(@Args('input') input: ProductRequestDto) {
    const command = new CreateProductCommand(input);
    return this.commandBus.execute(command);
  }

  @Mutation(() => ProductDto, {
    nullable: true,
    description: 'Update a product',
  })
  updateProduct(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('input') input: ProductRequestDto,
  ) {
    const command = new UpdateProductCommand(id, input);
    return this.commandBus.execute(command);
  }

  @Mutation(() => Boolean, { nullable: true, description: 'Delete a product' })
  deleteProduct(@Args({ name: 'id', type: () => Int }) id: number) {
    const command = new DeleteProductCommand(id);
    return this.commandBus.execute(command);
  }

  @ResolveField()
  async category(@Parent() product: ProductDto) {
    const query = new FindOneProductCategoryQuery(product.category.id);
    return this.queryBus.execute(query);
  }
}
