import { RequestHandler } from 'express';
import Note, { InvalidNoteIdError } from '../repositories/Note';

const removeNote: RequestHandler = (req, res) => {
  try {
    const noteId = req.params.id;
    new Note(noteId).delete();
    res.status(200).json({ message: `Note with id ${noteId} successfully deleted.` });
  } catch (e) {
    if (e instanceof InvalidNoteIdError) {
      res.status(404).json({ message: 'Note not found.' });
    } else {
      res.status(500).json({ message: 'Internal server error.' });
      throw e;
    }
  }
};

export default removeNote;
