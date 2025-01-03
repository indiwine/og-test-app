import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCategoryCommand } from './update-product-category.command';
import { ProductCategoryDto } from '../../dtos/product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../../entities/product-category.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateProductCategoryCommand)
export class UpdateProductCategoryHandler
  implements
    ICommandHandler<UpdateProductCategoryCommand, ProductCategoryDto | null>
{
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async execute(
    command: UpdateProductCategoryCommand,
  ): Promise<ProductCategoryDto | null> {
    const { id, payload } = command;

    const updateResult = await this.productCategoryRepository.update(
      id,
      payload,
    );

    if (updateResult.affected) {
      return await this.productCategoryRepository.findOne({
        where: { id },
      });
    }

    return null;
  }
}
