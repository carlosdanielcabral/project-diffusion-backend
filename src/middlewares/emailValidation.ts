import { RequestHandler } from 'express';
import Joi from 'joi';

const emailValidation: RequestHandler = (req, _res, next) => {
  const { email } = req.body;
  const { error } = Joi.object({
    email: Joi.string().email().required(),
  }).validate({ email });

  if (error) return next(error);

  return next();
};

export default emailValidation;
