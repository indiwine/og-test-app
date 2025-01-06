import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from './delete-product.command';
import { NullOrTrue } from '../../../common/types/null-or-true.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand, NullOrTrue>
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: DeleteProductCommand): Promise<NullOrTrue> {
    const { id } = command;
    const deleteResult = await this.productRepository.delete(id);
    return deleteResult.affected ? true : null;
  }
}
