import { Router } from 'express';
import UserRouter from '../routes/UserRouter';
import Route from '../routes';
import UserFactory from './UserFactory';
import PostRouter from '../routes/PostRouter';
import PostFactory from './PostFactory';

const RouteFactory = () => {
  const userController = UserFactory();
  const postController = PostFactory();
  const userRouter = new UserRouter(Router(), userController);
  const postRouter = new PostRouter(Router(), postController);
  const route = new Route(Router(), userRouter, postRouter);
  return route;
};

export default RouteFactory;
