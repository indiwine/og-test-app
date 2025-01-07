import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductQuery } from './find-product.query';
import { ProductDto } from '../../dtos/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';

@QueryHandler(FindProductQuery)
export class FindProductHandler
  implements IQueryHandler<FindProductQuery, ProductDto[]>
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  execute(query: FindProductQuery): Promise<ProductDto[]> {
    const condition: FindManyOptions<Product> = {
      where: {},
      order: { [query.sortField]: query.sortDirection },
    };

    if (query.includeCategory) {
      condition.relations = ['category'];
    }

    if (query.id) {
      condition.where['id'] = query.id;
    }

    if (query.name) {
      condition.where['name'] = ILike(`%${query.name}%`);
    }

    return this.productRepository.find(condition);
  }
}
