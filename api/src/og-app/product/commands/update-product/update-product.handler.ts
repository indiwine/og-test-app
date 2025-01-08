import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from './update-product.command';
import { ProductDto } from '../../dtos/product.dto';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../../prisma-module/prisma.service';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand, ProductDto>
{
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute(command: UpdateProductCommand): Promise<ProductDto> {
    const { id, payload } = command;

    const updatedProduct = await this.prismaService.product.update({
      where: { id },
      data: {
        ...payload,
        category: { connect: { id: payload.category } },
      },
      include: { category: true },
    });

    return {
      ...updatedProduct,
      price: updatedProduct.price.toNumber(),
    };
  }
}
