import { ProductRequestDto } from '../../dtos/product.dto';

export class CreateProductCommand {
  constructor(readonly payload: ProductRequestDto) {}
}
