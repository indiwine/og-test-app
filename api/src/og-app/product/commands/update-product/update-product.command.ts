import { AbstractUpdateCommand } from '../../../common/commands/abstract-update.command';
import { ProductRequestOptionalDto } from '../../dtos/product.dto';

export class UpdateProductCommand extends AbstractUpdateCommand<ProductRequestOptionalDto> {}
