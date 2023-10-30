import { CreateUserDto } from '../interfaces/create-user.interface';
import { UpdateUser } from '../interfaces/update-users.interface';
import { UserRepository } from '../repositories/users.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }
  async getUsers() {
    return await this.userRepository.findAll();
  }
  async getUserById(id: number) {
    return await this.userRepository.findById(id);
  }
  async updateUserById(user: UpdateUser) {
    return await this.userRepository.updateById(user);
  }
  async deleteUser(id: number) {
    return await this.userRepository.deleteById(id);
  }
}
