import { RequestHandler } from 'express';
import Joi from 'joi';

const contentValidation: RequestHandler = (req, _res, next) => {
  const { content } = req.body;
  const { error } = Joi.object({
    content: Joi.string().min(3).required(),
  }).validate({ content });

  if (error) return next(error);

  return next();
};

export default contentValidation;
