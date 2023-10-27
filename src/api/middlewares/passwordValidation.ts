import { RequestHandler } from 'express';
import Joi from 'joi';

const passwordValidation: RequestHandler = (req, _res, next) => {
  const { password } = req.body;
  const { error } = Joi.object({
    password: Joi.string().min(4).max(50).required(),
  }).validate({ password });

  if (error) return next(error);

  return next();
};

export default passwordValidation;
