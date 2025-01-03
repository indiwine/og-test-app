import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCategoryCommand } from './delete-product-category.command';
import { NullOrTrue } from '../../../common/types/null-or-true.type';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../../entities/product-category.entity';
import { Repository } from 'typeorm';

@CommandHandler(DeleteProductCategoryCommand)
export class DeleteProductCategoryHandler
  implements ICommandHandler<DeleteProductCategoryCommand, NullOrTrue>
{
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async execute(command: DeleteProductCategoryCommand): Promise<NullOrTrue> {
    const { id } = command;
    const deleteResult = await this.productCategoryRepository.delete(id);
    return deleteResult.affected ? true : null;
  }
}
