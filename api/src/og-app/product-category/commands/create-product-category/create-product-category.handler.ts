import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCategoryCommand } from './create-product-category.command';
import { ProductCategoryGraphqlResponseDto } from '../../dtos/product-category.dto';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../../prisma-module/prisma.service';

@CommandHandler(CreateProductCategoryCommand)
export class CreateProductCategoryHandler
  implements
    ICommandHandler<
      CreateProductCategoryCommand,
      ProductCategoryGraphqlResponseDto
    >
{
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  execute(
    command: CreateProductCategoryCommand,
  ): Promise<ProductCategoryGraphqlResponseDto> {
    const { payload } = command;
    return this.prismaService.productCategory.create({
      data: payload,
    });
  }
}
