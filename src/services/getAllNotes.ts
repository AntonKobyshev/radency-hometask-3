import { RequestHandler } from 'express';
import Note from '../repositories/Note';

const getAllNotes: RequestHandler = (req, res) => {
  const notes = Note.getAll().map(({ id, name }) => ({ id, name }));
  res.status(200).json({ notes });
};

export default getAllNotes;
