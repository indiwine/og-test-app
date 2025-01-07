import { FindProductDto } from '../../dtos/product.dto';

export class FindProductQuery extends FindProductDto {
  constructor(data: Partial<FindProductQuery>, readonly includeCategory: boolean = false) {
    super();
    Object.assign(this, data);
  }
}
