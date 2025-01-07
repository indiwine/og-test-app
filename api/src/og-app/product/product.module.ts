import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductHandler } from './commands/create-product/create-product.handler';
import { ProductCommandsResolver } from './resolvers/product.commands.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteProductHandler } from './commands/delete-product/delete-product.handler';
import { UpdateProductHandler } from './commands/update-product/update-product.handler';
import { FindProductHandler } from './queries/find-product/find-product.handler';
import { ProductQueriesResolver } from './resolvers/product.queries.resolver';

const commandHandlers: Provider[] = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
];
const queryHandlers: Provider[] = [FindProductHandler];
const graphqlResolvers: Provider[] = [ProductCommandsResolver, ProductQueriesResolver];

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CqrsModule],
  controllers: [],
  providers: [...commandHandlers, ...queryHandlers, ...graphqlResolvers],
})
export class ProductModule {}
