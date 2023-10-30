import { Request, Response } from 'express';
import { UserService } from '../services/users.services';

export default class UserController {
  constructor(private readonly userService: UserService) {}
  async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    res.json(user);
  }
  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    res.json(users);
  }
  async getUserById(req: Request, res: Response) {
    const user = await this.userService.getUserById(Number(req.params.id));
    res.json(user);
  }
  async patchUserById(req: Request, res: Response) {
    const user = await this.userService.updateUserById(req.body);
    res.json(user);
  }
  async deleteUserById(req: Request, res: Response) {
    const user = await this.userService.deleteUser(req.body.id);
    res.json(user);
  }
}
