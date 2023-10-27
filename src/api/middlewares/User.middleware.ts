import { RequestHandler } from "express";
import Joi from "joi";

class UserMiddleware {
  public save: RequestHandler = (req, _res, next) => {
    const invalidName = this.catchErrorsOnName(req.body.name);
    if (invalidName) return next(invalidName);

    const invalidEmail = this.catchErrorsOnEmail(req.body.email);
    if (invalidEmail) return next(invalidEmail);

    const invalidPassword = this.catchErrorsOnPassword(req.body.password);
    if (invalidPassword) return next(invalidPassword);

    return next();
  }

  public update: RequestHandler = (req, _res, next) => {
    const invalidName = this.catchErrorsOnName(req.body.name);
    if (invalidName) return next(invalidName);

    const invalidEmail = this.catchErrorsOnEmail(req.body.email);
    if (invalidEmail) return next(invalidEmail);

    return next();
  }

  public login: RequestHandler = (req, _res, next) => {
    const invalidEmail = this.catchErrorsOnEmail(req.body.email);
    if (invalidEmail) return next(invalidEmail);

    const invalidPassword = this.catchErrorsOnPassword(req.body.password);
    if (invalidPassword) return next(invalidPassword);

    return next();
  }

  public catchErrorsOnName = (name: any): Joi.ValidationError | undefined => {
    const { error } = Joi.object({
      name: Joi.string().min(3).max(50).required(),
    }).validate({ name });

    return error;
  };

  public catchErrorsOnEmail = (email: any): Joi.ValidationError | undefined => {
    const { error } = Joi.object({
      email: Joi.string().email().required(),
    }).validate({ email });

    return error;
  }

  public catchErrorsOnPassword = (password: any): Joi.ValidationError | undefined  => {
    const { error } = Joi.object({
      password: Joi.string().min(4).max(50).required(),
    }).validate({ password });

    return error;
  };
}

export default UserMiddleware;
