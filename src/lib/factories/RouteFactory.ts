import { Router } from 'express';
import UserRouter from '../../api/routes/UserRouter';
import Route from '../../api/routes';
import PostRouter from '../../api/routes/PostRouter';

const RouteFactory = () => {
  const userRouter = new UserRouter();
  const postRouter = new PostRouter();

  return new Route(Router(), userRouter, postRouter);
};

export default RouteFactory;
