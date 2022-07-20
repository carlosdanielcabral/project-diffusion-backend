import { Router } from 'express';
import UserRouter from '../routes/UserRouter';
import Route from '../routes';
import UserFactory from './UserFactory';

const RouteFactory = () => {
  const controller = UserFactory();
  const router = new UserRouter(Router(), controller);
  const route = new Route(Router(), router);
  return route;
};

export default RouteFactory;
