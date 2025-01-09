import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from './delete-product.command';
import { NullOrTrue } from '../../../common/types/null-or-true.type';
import { PrismaService } from '../../../prisma-module/prisma.service';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand, NullOrTrue>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteProductCommand): Promise<NullOrTrue> {
    const { id } = command;
    try {
      const deleteResult = await this.prismaService.product.delete({
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
