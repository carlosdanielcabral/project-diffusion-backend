import { Router } from 'express';
import UserController from '../controllers/UserController';
import User from '../database/models/User';
import UserRouter from '../routes/UserRouter';
import UserService from '../services/UserService';
import Route from '../routes';

const RouteFactory = () => {
  const service = new UserService(User);
  const controller = new UserController(service);
  const router = new UserRouter(Router(), controller);
  const route = new Route(Router(), router);
  return route;
};

export default RouteFactory;
