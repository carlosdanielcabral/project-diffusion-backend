import { RequestHandler } from 'express';
import Joi from 'joi';

const idValidation: RequestHandler = (req, _res, next) => {
  const { id } = req.params;
  const { error } = Joi.object({
    id: Joi.number().min(1).required(),
  }).validate({ id: Number(id) });

  if (error) return next(error);

  return next();
};

export default idValidation;
