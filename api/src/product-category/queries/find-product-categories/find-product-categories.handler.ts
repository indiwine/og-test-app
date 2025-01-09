import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductCategoriesQuery } from './find-product-categories.query';
import { ProductCategoryDto } from '../../dtos/product-category.dto';
import { PrismaService } from '../../../prisma-module/prisma.service';
import { Prisma } from '@prisma/client';

@QueryHandler(FindProductCategoriesQuery)
export class FindProductCategoriesHandler
  implements IQueryHandler<FindProductCategoriesQuery, ProductCategoryDto[]>
{
  constructor(private readonly prismaService: PrismaService) {}

  execute(query: FindProductCategoriesQuery): Promise<ProductCategoryDto[]> {
    const condition: Prisma.ProductCategoryFindManyArgs = {
      where: {},
    };

    if (query.id) {
      condition.where['id'] = query.id;
    }

    if (query.ids) {
      condition.where['id'] = { in: query.ids };
    }

    if (query.name) {
      condition.where['name'] = { contains: query.name, mode: 'insensitive' };
    }

    return this.prismaService.productCategory.findMany(condition);
  }
}
