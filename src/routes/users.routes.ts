import { Router } from 'express';
import { UserService } from './../modules/users/services/users.services';
import UserController from './../modules/users/controller/users.controller';
import { UserRepository } from './../modules/users/repositories/users.repository';
const usersRepository = new UserRepository();
const usersService = new UserService(usersRepository);
const usersController = new UserController(usersService);
const usersRouter = Router();
usersRouter
  .route('/users')
  .post((req, res) => usersController.createUser(req, res))
  .get((req, res) => usersController.getUsers(req, res))
  .patch((req, res) => usersController.patchUserById(req, res))
  .delete((req, res) => usersController.deleteUserById(req, res));
usersRouter
  .route('/users/:id')
  .get((req, res) => usersController.getUserById(req, res));

export default usersRouter;
