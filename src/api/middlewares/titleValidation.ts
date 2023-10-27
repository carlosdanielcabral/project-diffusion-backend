import { RequestHandler } from 'express';
import Joi from 'joi';

const titleValidation: RequestHandler = (req, _res, next) => {
  const { title } = req.body;
  const { error } = Joi.object({
    title: Joi.string().min(3).max(250).required(),
  }).validate({ title });

  if (error) return next(error);

  return next();
};

export default titleValidation;
