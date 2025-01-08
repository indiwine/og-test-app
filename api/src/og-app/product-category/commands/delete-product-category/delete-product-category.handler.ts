import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCategoryCommand } from './delete-product-category.command';
import { NullOrTrue } from '../../../common/types/null-or-true.type';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../../prisma-module/prisma.service';

@CommandHandler(DeleteProductCategoryCommand)
export class DeleteProductCategoryHandler
  implements ICommandHandler<DeleteProductCategoryCommand, NullOrTrue>
{
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async execute(command: DeleteProductCategoryCommand): Promise<NullOrTrue> {
    const { id } = command;
    try {
      const deleteResult = await this.prismaService.productCategory.delete({
        where: { id },
      });

      return deleteResult ? true : null;
    } catch (error) {
      // Check if this is "Record does not exist" error
      if (error.code === 'P2025') {
        return null;
      }

      throw error;
    }
  }
}
