import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { ProductDto } from '../../dtos/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from '../../../product-category/entities/product-category.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, ProductDto>
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductDto> {
    const { payload } = command;
    const newProduct = this.productRepository.create({
      ...payload,
      category: { id: payload.category } as unknown as Partial<ProductCategory>,
    });
    const product = await this.productRepository.save(newProduct);
    console.log(product);
    return product;
  }
}
