import { CreateUserDto, User } from '../interfaces/create-user.interface';
import { Prisma, PrismaClient } from '@prisma/client';
import { UpdateUser } from '../interfaces/update-users.interface';
import { hashPassword } from '../../../utils/passwordHasher';
import { iData } from '../interfaces/data.interface';
import { isSecurePassword } from '../../../utils/isSecurePassword';
import { ErrorCode, ErrorMessage } from '../../../utils/errorCodes';
import { handleError } from '../../../utils/handlerError';

const prisma = new PrismaClient();

export class UserRepository {
  async create(user: CreateUserDto): Promise<iData<User>> {
    try {
      const password = await hashPassword(user.password);
      const newUser = await prisma.users.create({
        data: { ...user, password }
      });
      return {
        code: 200,
        message: 'User Created Successfully.',
        data: newUser
      };
    } catch (error: any) {
      return handleError(error, ErrorCode.notCreateSucess);
    }
  }
  async findAll(): Promise<iData<Array<User>>> {
    try {
      const users = await prisma.users.findMany();

      if (!users || users.length === 0) {
        return {
          message: ErrorMessage[ErrorCode.NotFound],
          code: 404
        };
      }
      return { code: 200, message: 'Sucess', data: users };
    } catch (error: any) {
      return handleError(error, ErrorCode.NotFound);
    }
  }
  async findById(id?: number): Promise<iData<User | null>> {
    if (typeof id !== 'number' || id <= 0) {
      return handleError(new Error('Invalid User ID'), ErrorCode.InvalidId);
    }

    try {
      const user = await prisma.users.findUnique({
        where: { id: id }
      });

      if (!user) {
        return handleError(new Error('User Not Found'), ErrorCode.NotFound);
      }

      return {
        code: 200,
        message: 'Success',
        data: user
      };
    } catch (error) {
      return {
        code: 500,
        message: ErrorMessage[ErrorCode.InternalServer],
        data: null
      };
    }
  }

  async updateById(user: UpdateUser): Promise<iData<User | null>> {
    try {
      const { id, firstName, lastName, email } = user;
      let { password } = user;
      if (typeof id !== 'number' || id <= 0) {
        return handleError(new Error('Invalid User ID'), ErrorCode.InvalidId);
      }

      if (password !== undefined) {
        const isPasswordSecure = isSecurePassword(password);
        if (!isPasswordSecure) {
          return {
            code: 400,
            message: ErrorMessage[ErrorCode.PasswordNotSecure],
            data: null
          };
        }
        password = await hashPassword(password);
      }
      const updatedUser = await prisma.users.update({
        where: { id },
        data: {
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          email: email || undefined,
          password: password || undefined
        }
      });

      return {
        code: 200,
        message: 'User data updated successfully.',
        data: updatedUser
      };
    } catch (error) {
      console.error('Error while updating user data:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2020') {
          return {
            code: 400,
            message: ErrorMessage[ErrorCode.InvalidRequestData],
            data: null
          };
        }
      }

      return {
        code: 500,
        message: ErrorMessage[ErrorCode.InternalServer],
        data: null
      };
    }
  }
  async deleteById(
    id: number
  ): Promise<iData<{ code: number; message: string }>> {
    if (typeof id !== 'number' || id <= 0) {
      return handleError(new Error('Invalid User ID'), ErrorCode.InvalidId);
    }
    try {
      await prisma.users.delete({ where: { id: id } });
      return {
        code: 200,
        message: 'User deleted successfully.'
      };
    } catch (error) {
      return {
        code: 204,
        message: `User ${ErrorMessage[ErrorCode.NotFound]}`
      };
    }
  }
}
