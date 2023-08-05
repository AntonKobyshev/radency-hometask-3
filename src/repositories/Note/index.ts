import crypto from 'crypto';
import Category from '../Category';
import { InvalidNoteIdError } from './errors';
import { notesData, type NoteData } from './data';

export default class Note implements NoteData {
  static getAll() {
    return notesData.map(
      (noteData) =>
        new Note(
          noteData.name,
          noteData.content,
          noteData.categoryId,
          noteData.isArchived,
          noteData
        )
    );
  }

  public constructor(id: Note['id']);
  public constructor(
    name: Note['name'],
    content: Note['content'],
    categoryId: NoteData['categoryId']
  );
  public constructor(
    name: Note['name'],
    content: Note['content'],
    categoryId: NoteData['categoryId'],
    isArchived: NoteData['isArchived'],
    noteData: NoteData
  );
  public constructor(noteData: NoteData);
  public constructor(...args: any[]) {
    this.name = '';
    this.content = '';
    this.categoryId = '';
    this.noteData = null;
    this.isArchived = false;

    if (args.length === 3) {
      this.name = args[0];
      this.content = args[1];
      this.categoryId = args[2];
    } else if (args.length === 5) {
      this.name = args[0];
      this.content = args[1];
      this.categoryId = args[2];
      this.isArchived = args[3];
      this.noteData = args[4];
    } else {
      const noteData =
        notesData.find((noteData) => noteData.id === args[0]) || null;

      if (noteData === null) throw new InvalidNoteIdError(args[0]);

      this.setNoteData(noteData);
    }
  }

  public save() {
    new Category(this.categoryId); // to check if the categoryId is valid

    if (this.noteData === null) {
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
  public delete() {
    if (this.noteData !== null) {
      notesData.splice(notesData.indexOf(this.noteData), 1);
      this.noteData = null;
    }
  }

  public get id(): string {
    if (this.noteData === null)
      throw new Error('Unable to get the id of a not saved note');
    return this.noteData?.id;
  }
  public name: NoteData['name'];
  public content: NoteData['content'];
  public isArchived: NoteData['isArchived'];
  public categoryId: NoteData['categoryId'];
  public get creationDate() {
    if (this.noteData === null)
      throw new Error('Unable to get the creation date of a not saved note');
    return this.noteData.creationDate;
  }
  public get category() {
    return new Category(this.categoryId);
  }

  private noteData: NoteData | null;
  private setNoteData(noteData: NoteData) {
    this.noteData = noteData;
    this.assignProperties(this, noteData);
  }
  private assignProperties(
    target: Omit<NoteData, 'id' | 'creationDate'>,
    source: Omit<NoteData, 'id' | 'creationDate'>
  ) {
    target.name = source.name;
    target.content = source.content;
    target.categoryId = source.categoryId;
    target.isArchived = source.isArchived;
  }
}

export { InvalidNoteIdError };