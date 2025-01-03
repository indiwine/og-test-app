import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import {
  ProductCategoryRequestDto,
  ProductCategoryDto,
} from '../dtos/product-category.dto';
import { CreateProductCategoryCommand } from '../commands/create-product-category/create-product-category.command';
import { DeleteProductCategoryCommand } from '../commands/delete-product-category/delete-product-category.command';
import { UpdateProductCategoryCommand } from '../commands/update-product-category/update-product-category.command';

@Resolver(() => ProductCategoryDto)
export class ProductCategoryCommandsResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation(() => ProductCategoryDto)
  async createProductCategory(@Args('input') input: ProductCategoryRequestDto) {
    const command = new CreateProductCategoryCommand(input);
    return await this.commandBus.execute(command);
  }

  @Mutation(() => ProductCategoryDto, { nullable: true })
  async updateProductCategory(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args('input') input: ProductCategoryRequestDto,
  ) {
    const command = new UpdateProductCategoryCommand(id, input);
    return await this.commandBus.execute(command);
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteProductCategory(
    @Args({ name: 'id', type: () => ID }) id: number,
  ) {
    const command = new DeleteProductCategoryCommand(id);
    return await this.commandBus.execute(command);
  }
}
