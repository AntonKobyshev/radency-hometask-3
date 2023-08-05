import { Router, json } from "express";
import createNote, { notesCreationBodySchema } from "../services/createNote";
import removeNote from "../services/removeNote";
import editNote, { notesEditionBodySchema } from "../services/editNote";
import getNotes from "../services/getAllNotes";
import getNote from "../services/getNote";
import getStatistics from "../services/getStatistics";
import generateValidationMiddleware from "../helpers/validationMiddlware";

const notesRouter = Router();

notesRouter.get("/", getNotes);
notesRouter.get("/stats", getStatistics);

notesRouter.post(
  "/",
  json(),
  generateValidationMiddleware(notesCreationBodySchema),
  createNote
);
notesRouter.delete("/:id", removeNote);
notesRouter.patch(
  "/:id",
  json(),
  generateValidationMiddleware(notesEditionBodySchema),
  editNote
);
notesRouter.get("/:id", getNote);

export default notesRouter;
