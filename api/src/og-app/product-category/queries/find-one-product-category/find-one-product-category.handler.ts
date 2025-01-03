import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneProductCategoryQuery } from './find-one-product-category.query';
import { ProductCategoryDto } from '../../dtos/product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../../entities/product-category.entity';
import { Repository } from 'typeorm';

@QueryHandler(FindOneProductCategoryQuery)
export class FindOneProductCategoryHandler
  implements
    IQueryHandler<FindOneProductCategoryQuery, ProductCategoryDto | null>
{
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  execute(
    query: FindOneProductCategoryQuery,
  ): Promise<ProductCategoryDto | null> {
    return this.productCategoryRepository.findOne({
      where: { id: query.id },
    });
  }
}
