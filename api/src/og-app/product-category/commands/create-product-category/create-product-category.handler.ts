import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCategoryCommand } from './create-product-category.command';
import { ProductCategoryGraphqlResponseDto } from '../../dtos/product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../../entities/product-category.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateProductCategoryCommand)
export class CreateProductCategoryHandler
  implements
    ICommandHandler<
      CreateProductCategoryCommand,
      ProductCategoryGraphqlResponseDto
    >
{
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  execute(
    command: CreateProductCategoryCommand,
  ): Promise<ProductCategoryGraphqlResponseDto> {
    const { payload } = command;
    return this.productCategoryRepository.save(payload);
  }
}
