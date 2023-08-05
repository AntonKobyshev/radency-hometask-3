import { RequestHandler } from 'express';
import Note, { InvalidNoteIdError } from '../repositories/Note';

const removeNote: RequestHandler = (req, res) => {
  try {
    new Note(req.params.id).delete();
    res.status(204).end(); 
  } catch (e) {
    if (e instanceof InvalidNoteIdError) {
      res.status(404).end(); 
    } else {
      res.status(500).json({ message: 'Internal server error.' });
      throw e;
    }
  }
};

export default removeNote;
