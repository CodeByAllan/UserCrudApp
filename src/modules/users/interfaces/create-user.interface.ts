export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface User extends CreateUserDto {
  id: number;
}
