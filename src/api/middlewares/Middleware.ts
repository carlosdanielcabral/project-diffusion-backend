import { RequestHandler } from "express";
import Token from "../../lib/auth/Token";
import HttpError from "../../lib/http/HttpError";
import HttpStatusCode from "../../lib/http/HttpStatusCode";
import User from '../../database/models/User';

class BaseMiddleware {
  public constructor(private _token = new Token()) { }

  protected validateToken: RequestHandler = async (req, _res, next) => {
    const { authorization: token } = req.headers;

    if (!token) {
      throw new HttpError(HttpStatusCode.Unauthorized, 'Token is missing');
    }

    const { data: { id } } = await this._token.validate(token);

    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new HttpError(HttpStatusCode.Unauthorized, 'Invalid token');
    }

    req.body.user = user;

    return next();
  }
}

export default BaseMiddleware;
