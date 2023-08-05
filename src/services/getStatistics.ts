import { RequestHandler } from 'express';
import Category from '../repositories/Category';
import Note from '../repositories/Note';

const getStatistics: RequestHandler = (req, res) => {
  const notes = Note.getAll();

  const statistics = Category.getAll().map((category) => {
    const { id } = category;
    const { activeNotesNumber, archivedNotesNumber } = notes.reduce(
      (acc, note) => {
        if (note.categoryId === id) {
          if (note.isArchived) {
            acc.archivedNotesNumber++;
          } else {
            acc.activeNotesNumber++;
          }
        }
        return acc;
      },
      { activeNotesNumber: 0, archivedNotesNumber: 0 }
    );

    return {
      category,
      activeNotesNumber,
      archivedNotesNumber,
    };
  });

  res.json({ statistics });
};

export default getStatistics;
