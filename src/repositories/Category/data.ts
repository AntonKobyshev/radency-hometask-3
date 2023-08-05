export interface CategoryData {
  id: string;
  name: string;
}

export const categoriesData: CategoryData[] = [];

categoriesData.push(
  {
    id: 'task',
    name: 'Task',
  },
  {
    id: 'thought',
    name: 'Random Thought',
  },
  {
    id: 'idea',
    name: 'Idea',
  }
);