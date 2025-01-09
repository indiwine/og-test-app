import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneProductCategoryQuery } from './find-one-product-category.query';
import { ProductCategoryDto } from '../../dtos/product-category.dto';
import { PrismaService } from '../../../prisma-module/prisma.service';

@QueryHandler(FindOneProductCategoryQuery)
export class FindOneProductCategoryHandler
  implements
    IQueryHandler<FindOneProductCategoryQuery, ProductCategoryDto | null>
{
  constructor(private readonly prismaService: PrismaService) {}

  execute(
    query: FindOneProductCategoryQuery,
  ): Promise<ProductCategoryDto | null> {
    return this.prismaService.productCategory.findUnique({
      where: { id: query.id },
    });
  }
}
