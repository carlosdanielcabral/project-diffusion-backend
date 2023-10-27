import { RequestHandler } from 'express';
import Joi from 'joi';

const nameValidation: RequestHandler = (req, _res, next) => {
  const { name } = req.body;
  const { error } = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  }).validate({ name });

  if (error) return next(error);

  return next();
};

export default nameValidation;
