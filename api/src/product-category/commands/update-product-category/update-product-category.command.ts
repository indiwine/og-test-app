import { AbstractUpdateCommand } from '../../../common/commands/abstract-update.command';
import { ProductCategoryOptionalDto } from '../../dtos/product-category.dto';

export class UpdateProductCategoryCommand extends AbstractUpdateCommand<ProductCategoryOptionalDto> {}
