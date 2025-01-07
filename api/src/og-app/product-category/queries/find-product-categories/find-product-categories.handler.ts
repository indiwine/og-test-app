import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductCategoriesQuery } from './find-product-categories.query';
import { ProductCategoryDto } from '../../dtos/product-category.dto';
import { FindManyOptions, ILike, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../../entities/product-category.entity';

@QueryHandler(FindProductCategoriesQuery)
export class FindProductCategoriesHandler
  implements IQueryHandler<FindProductCategoriesQuery, ProductCategoryDto[]>
{
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  execute(query: FindProductCategoriesQuery): Promise<ProductCategoryDto[]> {
    const condition: FindManyOptions<ProductCategory> = {
      where: {},
    };

    if (query.id) {
      condition.where['id'] = query.id;
    }

    if (query.ids) {
      condition.where['id'] = In(query.ids);
    }

    if (query.name) {
      condition.where['name'] = ILike(`%${query.name}%`);
    }

    return this.productCategoryRepository.find(condition);
  }
}
