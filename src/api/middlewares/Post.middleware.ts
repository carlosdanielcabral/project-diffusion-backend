import { RequestHandler } from "express";
import Joi from "joi";

class PostMiddleware {
  public save: RequestHandler = (req, _res, next) => {
    const invalidTitle = this.catchErrorsOnTitle(req.body.title)
    if (invalidTitle) return next(invalidTitle);

    const invalidContent = this.catchErrorsOnContent(req.body.content);
    if (invalidContent) return next(invalidContent);

    return next();
  }

  public update: RequestHandler = (req, _res, next) => {
    const invalidId = this.catchErrorsOnId(req.params.id);
    if (invalidId) return next(invalidId);

    const invalidTitle = this.catchErrorsOnTitle(req.body.title)
    if (invalidTitle) return next(invalidTitle);

    const invalidContent = this.catchErrorsOnContent(req.body.content);
    if (invalidContent) return next(invalidContent);
    
    return next();
  }

  public delete: RequestHandler = (req, _res, next) => {
    const invalidId = this.catchErrorsOnId(req.params.id);
    if (invalidId) return next(invalidId);

    return next();
  }

  public catchErrorsOnTitle = (title: any) => {
    const { error } = Joi.object({
      title: Joi.string().min(3).max(250).required(),
    }).validate({ title });
  
    return error;
  };

  public catchErrorsOnContent = (content: any) => {
    const { error } = Joi.object({
      content: Joi.string().min(3).required(),
    }).validate({ content });
  
    return error;
  };
  
  public catchErrorsOnId = (id: any) => {
    const { error } = Joi.object({
      id: Joi.number().min(1).required(),
    }).validate({ id: Number(id) });
  
    return error;
  };  
}

export default PostMiddleware;
