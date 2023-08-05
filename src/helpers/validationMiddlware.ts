import { RequestHandler, Request, Response, NextFunction } from 'express';
import { AnyObjectSchema, ValidationError } from 'yup';

export default function generateValidationMiddleware(
  bodySchema: AnyObjectSchema
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = bodySchema.validateSync(req.body, { stripUnknown: false });
      req.body = validatedBody;
      next();
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(400).json({
          message: 'Validation error',
          errors: e.errors,
        });
      } else {
        next(e);
      }
    }
  };
}
