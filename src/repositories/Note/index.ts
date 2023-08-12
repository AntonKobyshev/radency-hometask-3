import crypto from 'crypto';
import Category from '../Category';
import { InvalidNoteIdError } from './errors';
import { notesData, type NoteData } from './data';

export default class Note implements NoteData {
  name: NoteData['name'] = '';
  content: NoteData['content'] = '';
  isArchived: NoteData['isArchived'] = false;
  categoryId: NoteData['categoryId'] = '';
  noteData: NoteData | null = null;

  constructor(...args: any[]) {
    if (args.length === 1 && typeof args[0] === 'string') {
      const noteData = notesData.find(data => data.id === args[0]);
      if (!noteData) throw new InvalidNoteIdError(args[0]);
      this.setNoteData(noteData);
    } else if (args.length >= 3 && args.length <= 5) {
      [this.name, this.content, this.categoryId, this.isArchived, this.noteData] = args;
    }
  }

  static getAll() {
    return notesData.map(data => new Note(data));
  }

  save() {
    new Category(this.categoryId);
    if (!this.noteData) {
      this.noteData = {
        id: crypto.randomUUID(),
        name: this.name,
        content: this.content,
        categoryId: this.categoryId,
        creationDate: new Date(),
        isArchived: false,
      };
      notesData.push(this.noteData);
    } else {
      this.assignProperties(this.noteData, this);
    }
  }

  delete() {
    if (this.noteData) {
      notesData.splice(notesData.indexOf(this.noteData), 1);
      this.noteData = null;
    }
  }

  get id(): string {
    if (!this.noteData) throw new Error('Note is not saved yet.');
    return this.noteData.id;
  }

  get creationDate() {
    if (!this.noteData) throw new Error('Note is not saved yet.');
    return this.noteData.creationDate;
  }

  get category() {
    return new Category(this.categoryId);
  }

  private setNoteData(noteData: NoteData) {
    this.noteData = noteData;
    this.assignProperties(this, noteData);
  }

  private assignProperties(target: NoteData, source: NoteData) {
    target.name = source.name;
    target.content = source.content;
    target.categoryId = source.categoryId;
    target.isArchived = source.isArchived;
  }
}

export { InvalidNoteIdError };
