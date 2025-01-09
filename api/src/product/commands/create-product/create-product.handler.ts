import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { ProductDto } from '../../dtos/product.dto';
import { PrismaService } from '../../../prisma-module/prisma.service';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, ProductDto>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateProductCommand): Promise<ProductDto> {
    const { payload } = command;
    const newProduct = await this.prismaService.product.create({
      data: {
        ...payload,
        category: { connect: { id: payload.category } },
      },
      include: { category: true },
    });

    return {
      ...newProduct,
      price: newProduct.price.toNumber(),
    };
  }
}
