export class FindProductCategoriesQuery {
  public id?: number;
  public name?: string;
  public ids?: number[];

  constructor(data: Partial<FindProductCategoriesQuery>) {
    Object.assign(this, data);

    if (data.ids && data.id) {
      throw new Error('You cannot provide both id and ids');
    }
  }
}
