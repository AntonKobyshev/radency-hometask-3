import { type CategoryData, categoriesData } from './data';
import { InvalidCategoryIdError } from './errors';

export default class Category implements CategoryData {
  static getAll() {
    return categoriesData.map(
      (categoryData) => new Category(categoryData.id, categoryData.name)
    );
  }
  public constructor(id: CategoryData['id']);
  public constructor(id: CategoryData['id'], name: CategoryData['name']);
  public constructor(...args: any[]) {
    this.id = '';
    this.name = '';

    if (args.length === 2) {
      this.id = args[0];
      this.name = args[1];
    } else {
      const data = categoriesData.find(
        (categoryData) => categoryData.id === args[0]
      );

      if (data === undefined) throw new InvalidCategoryIdError(args[0]);

      Object.assign(this, data);
    }
  }
  id: CategoryData['id'];
  name: CategoryData['name'];
}

export { InvalidCategoryIdError };