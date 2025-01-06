import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from './update-product.command';
import { ProductDto } from '../../dtos/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand, ProductDto>
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: UpdateProductCommand): Promise<ProductDto> {
    const { id, payload } = command;

    const updateResult = await this.productRepository.update(id, {
      ...payload,
      category: { id: payload.category } as unknown as Partial<Product>,
    });

    if (updateResult.affected) {
      return await this.productRepository.findOne({
        where: { id },
      });
    }
    return null;
  }
}
