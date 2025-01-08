import { ProductCategoryCreatDto } from '../../dtos/product-category.dto';

export class CreateProductCategoryCommand {
  constructor(readonly payload: ProductCategoryCreatDto) {}
}
