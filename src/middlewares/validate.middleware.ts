import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import ValidationError from '@/errors/ValidationError';

/**
 * Returns an Express middleware that validates req.body with the given schema.
 * If validation fails, throws your custom ValidationError so the global
 * error handler can format it.
 */
export const validate =
  <T extends ZodSchema<any>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const message = parsed.error.issues
        .map((i) => `${i.path.join('.')}: ${i.message}`)
        .join('; ');

      return next(
        new ValidationError({
          message: `Invalid request body – ${message}`,
        })
      );
    }

    req.body = parsed.data;
    next();
  };
