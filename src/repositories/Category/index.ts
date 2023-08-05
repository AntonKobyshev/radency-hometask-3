import { CategoryData, categoriesData } from './data';
import { InvalidCategoryIdError } from './errors';

export default class Category implements CategoryData {
  public id: CategoryData['id'];
  public name: CategoryData['name'];

  constructor(id: CategoryData['id']);
  constructor(id: CategoryData['id'], name: CategoryData['name']);
  constructor(...args: any[]) {
    this.id = '';
    this.name = '';

    if (args.length === 2) {
      this.id = args[0];
      this.name = args[1];
    } else {
      const categoryId = args[0];
      const data = categoriesData.find((categoryData) => categoryData.id === categoryId);

      if (!data) {
        throw new InvalidCategoryIdError(categoryId);
      }

      Object.assign(this, data);
    }
  }

  static getAll(): Category[] {
    return categoriesData.map((categoryData) => new Category(categoryData.id, categoryData.name));
  }
}

export { InvalidCategoryIdError };
