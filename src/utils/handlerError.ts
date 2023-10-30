import { Prisma } from '@prisma/client';
import { ErrorCode, ErrorMessage } from './errorCodes';
import type { iData } from 'src/modules/users/interfaces/data.interface';

export function handleError(error: Error, errorCode: ErrorCode): iData<any> {
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
    code: errorCode,
    message: ErrorMessage[errorCode],
    data: null
  };
}
