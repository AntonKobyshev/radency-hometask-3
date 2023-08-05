import crypto from "crypto";
import Category from "../Category";
import { InvalidNoteIdError } from "./errors";
import { notesData, NoteData } from "./data";

export default class Note implements NoteData {
  public name: NoteData["name"];
  public content: NoteData["content"];
  public isArchived: NoteData["isArchived"];
  public categoryId: NoteData["categoryId"];

  private noteData: NoteData | null;

  constructor(
    idOrData: Note["id"] | NoteData,
    name?: NoteData["name"],
    content?: NoteData["content"],
    categoryId?: NoteData["categoryId"],
    isArchived?: NoteData["isArchived"]
  ) {
    this.name = "";
    this.content = "";
    this.categoryId = "";
    this.noteData = null;
    this.isArchived = false;

    if (typeof idOrData === "string") {
      this.name = name || "";
      this.content = content || "";
      this.categoryId = categoryId || "";
      this.isArchived = !!isArchived;
      this.save();
    } else {
      this.setNoteData(idOrData);
    }
  }

  static getAll(): Note[] {
    return notesData.map((noteData) => new Note(noteData));
  }

  public save(): void {
    new Category(this.categoryId);
    if (this.noteData === null) {
      const newNoteData: NoteData = {
        id: crypto.randomUUID(),
        name: this.name,
        content: this.content,
        categoryId: this.categoryId,
        creationDate: new Date(),
        isArchived: false,
      };
      this.noteData = newNoteData;
      notesData.push(newNoteData);
    } else {
      this.assignProperties(this.noteData, this);
    }
  }

  public delete(): void {
    if (this.noteData !== null) {
      const index = notesData.indexOf(this.noteData);
      if (index !== -1) {
        notesData.splice(index, 1);
      }
      this.noteData = null;
    }
  }

  public get id(): string {
    if (!this.noteData) {
      throw new Error("Unable to get the id of a not saved note");
    }
    return this.noteData.id;
  }

  public get creationDate(): Date {
    if (!this.noteData) {
      throw new Error("Unable to get the creation date of a not saved note");
    }
    return this.noteData.creationDate;
  }

  public get category(): Category {
    return new Category(this.categoryId);
  }

  private setNoteData(noteData: NoteData): void {
    this.noteData = noteData;
    this.assignProperties(this, noteData);
  }

  private assignProperties(
    target: Partial<NoteData>,
    source: Partial<NoteData>
  ): void {
    target.name = source.name || "";
    target.content = source.content || "";
    target.categoryId = source.categoryId || "";
    target.isArchived = !!source.isArchived;
  }
}

export { InvalidNoteIdError };
