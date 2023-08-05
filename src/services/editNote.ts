import { RequestHandler } from 'express';
import { object, string, boolean } from 'yup';
import Note, { InvalidNoteIdError } from '../repositories/Note';
import Category from '../repositories/Category';

export const notesEditionBodySchema = object({
  name: string(),
  content: string(),
  categoryId: string().oneOf(Category.getAll().map((category) => category.id)),
  isArchived: boolean(),
}).noUnknown();

const editNote: RequestHandler = (req, res) => {
  try {
    const id = req.params.id;
    const note = new Note(id);

    Object.assign(note, req.body);

    note.save();
    res.status(200).json({ message: `Note with id ${id} successfully modified.` }).end(); 
  } catch (e) {
    if (e instanceof InvalidNoteIdError) {
      res.status(404).json({ message: `Validation error.` }).end();
    } else {
      res.status(500).json({ message: `Something goes wrong!` }).end();
      throw e;
    }
  }
};

export default editNote;
