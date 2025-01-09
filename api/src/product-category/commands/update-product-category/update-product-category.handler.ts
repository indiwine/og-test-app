import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCategoryCommand } from './update-product-category.command';
import { ProductCategoryDto } from '../../dtos/product-category.dto';
import { PrismaService } from '../../../prisma-module/prisma.service';

@CommandHandler(UpdateProductCategoryCommand)
export class UpdateProductCategoryHandler
  implements
    ICommandHandler<UpdateProductCategoryCommand, ProductCategoryDto | null>
{
  constructor(private readonly prismaService: PrismaService) {}

  execute(
    command: UpdateProductCategoryCommand,
  ): Promise<ProductCategoryDto | null> {
    const { id, payload } = command;

    try {
      return this.prismaService.productCategory.update({
        where: { id },
        data: payload,
      });
    } catch (error) {
      // Check if this is "Record does not exist" error
      if (error.code === 'P2025') {
        return null;
      }

      throw error;
    }
  }
}
