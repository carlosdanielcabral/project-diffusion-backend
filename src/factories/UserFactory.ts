import UserController from '../controllers/UserController';
import User from '../database/models/User';
import UserService from '../services/UserService';

const UserFactory = () => {
  const service = new UserService(User);
  const controller = new UserController(service);
  return controller;
};

export default UserFactory;
