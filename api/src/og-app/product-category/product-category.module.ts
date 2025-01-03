import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductCategory } from './entities/product-category.entity';
import { CreateProductCategoryHandler } from './commands/create-product-category/create-product-category.handler';
import { ProductCategoryCommandsResolver } from './resolvers/product-category.commands.resolver';
import { DeleteProductCategoryHandler } from './commands/delete-product-category/delete-product-category.handler';
import { UpdateProductCategoryHandler } from './commands/update-product-category/update-product-category.handler';
import { FindProductCategoriesHandler } from './queries/find-product-categories/find-product-categories.handler';
import { FindOneProductCategoryHandler } from './queries/find-one-product-category/find-one-product-category.handler';
import { ProductCategoryQueriesResolver } from './resolvers/product-category.queries.resolver';

const commandHandlers: Provider[] = [
  CreateProductCategoryHandler,
  DeleteProductCategoryHandler,
  UpdateProductCategoryHandler,
];

const queryHandlers: Provider[] = [
  FindProductCategoriesHandler,
  FindOneProductCategoryHandler,
];

const graphqlResolvers: Provider[] = [
  ProductCategoryCommandsResolver,
  ProductCategoryQueriesResolver,
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory]), CqrsModule],
  controllers: [],
  providers: [...commandHandlers, ...graphqlResolvers, ...queryHandlers],
})
export class ProductCategoryModule {}
