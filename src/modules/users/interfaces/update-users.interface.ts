export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
export interface UpdateUser extends UpdateUserDto {
  id: number;
}
