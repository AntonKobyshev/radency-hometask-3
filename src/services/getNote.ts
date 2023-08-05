import { RequestHandler } from 'express';
import Note, { InvalidNoteIdError } from '../repositories/Note';

const getNote: RequestHandler = (req, res) => {
  try {
    const note = new Note(req.params.id);

    res.status(200).json({
      id: note.id,
      name: note.name,
      content: note.content,
      category: note.category,
      creationDate: note.creationDate,
      isArchived: note.isArchived,
    });
  } catch (e) {
    if (e instanceof InvalidNoteIdError) {
      res.status(404).end();
    } else {
      res.status(500).json({ message: 'Internal server error.' });
      throw e;
    }
  }
};

export default getNote;
