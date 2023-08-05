import { RequestHandler } from 'express';
import { object, string } from 'yup';
import Note from '../repositories/Note';
import { InvalidCategoryIdError } from '../repositories/Category';
import Category from '../repositories/Category';

export const notesCreationBodySchema = object({
  name: string().required(),
  content: string().required(),
  categoryId: string()
    .oneOf(Category.getAll().map((category) => category.id))
    .required(),
}).noUnknown();

const createNote: RequestHandler = (req, res) => {
  try {
    const note = new Note(req.body.name, req.body.content, req.body.categoryId);
    note.save();
    res.status(200).json({ message: `The note was created, with id: ${note.id}`});
  } catch (e) {
    if (e instanceof InvalidCategoryIdError)
      res.status(400).json({ message: 'Invalid category id.' });
    else throw e;
  }
};

export default createNote;
