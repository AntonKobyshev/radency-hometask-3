import Category from '../Category';

export interface NoteData {
  id: string;
  name: string;
  content: string;
  categoryId: Category['id'];
  creationDate: Date;
  isArchived: boolean;
}

export const notesData: NoteData[] = [];

notesData.push(
  {
    id: '1',
    name: 'Shopping list',
    categoryId: 'task',
    content: 'Tomatoes, bread.',
    isArchived: false,
    creationDate: new Date(),
  },
  {
    id: '2',
    name: 'The theory of evolution',
    categoryId: 'thought',
    content: `The evolution theory learn`,
    isArchived: false,
    creationDate: new Date(),
  },
  {
    id: '3',
    name: 'New Feature',
    content: 'Implement new feature 3/5/2021, 5/5/2021',
    categoryId: 'idea',
    isArchived: false,
    creationDate: new Date(),
  },
  {
    id: '4',
    name: 'Some idea',
    content: 'Find solution',
    categoryId: 'task',
    isArchived: false,
    creationDate: new Date(),
  },
  {
    id: '5',
    name: 'Plan weekend trip',
    content: 'Write weekend trip',
    categoryId: 'task',
    isArchived: false,
    creationDate: new Date(),
  },
  {
    id: '6',
    name: 'Books',
    content: 'Read 10 new books till the end of the year',
    categoryId: 'thought',
    isArchived: true,
    creationDate: new Date(),
  },
  {
    id: '7',
    name: 'Appointment',
    content: 'Go to the appointment with Sara 20/10/2023',
    categoryId: 'idea',
    isArchived: true,
    creationDate: new Date(),
  }
);