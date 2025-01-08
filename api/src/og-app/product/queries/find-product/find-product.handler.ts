import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductQuery } from './find-product.query';
import { ProductDto } from '../../dtos/product.dto';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../../prisma-module/prisma.service';

@QueryHandler(FindProductQuery)
export class FindProductHandler
  implements IQueryHandler<FindProductQuery, ProductDto[]>
{
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute(query: FindProductQuery): Promise<ProductDto[]> {
    const where: any = {};

    if (query.id) {
      where.id = query.id;
    }

    if (query.name) {
      where.name = { contains: query.name, mode: 'insensitive' };
    }

    const products = await this.prismaService.product.findMany({
      where,
      orderBy: { [query.sortField]: query.sortDirection },
      include: { category: query.includeCategory },
    });

    return products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));
  }
}
