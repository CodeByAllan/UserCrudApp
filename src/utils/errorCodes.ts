export enum ErrorCode {
  InvalidId = 'INVALID_ID',
  PasswordNotSecure = 'PASSWORD_NOT_SECURE',
  InternalServer = 'ERROR_ON_SERVER',
  NotFound = 'NOT_FOUND',
  InvalidRequestData = 'INVALID_REQUEST_DATA',
  notCreateSucess = 'NOT_CREATED_SUCESSFULLY'
}

export const ErrorMessage = {
  [ErrorCode.InvalidId]: 'Invalid User ID Provided.',
  [ErrorCode.PasswordNotSecure]:
    'The password must contain at least 8 digits and must contain numbers and have at least one uppercase letter, one lowercase letter and one special character.',
  [ErrorCode.InternalServer]: 'Internal server error.',
  [ErrorCode.NotFound]: 'Not Found',
  [ErrorCode.InvalidRequestData]: 'Invalid request data.',
  [ErrorCode.notCreateSucess]: 'not created successfully'
};
