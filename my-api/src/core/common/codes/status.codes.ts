import { CodeDescription } from '../types/common.types';
import { HttpStatus } from '@nestjs/common';

export class StatusCodes {
  public static BAD_REQUEST_ERROR: CodeDescription = {
    code: HttpStatus.BAD_REQUEST,
    message: 'Bad Request',
  };

  public static UNAUTHORIZED: CodeDescription = {
    code: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized',
  };

  public static INTERNAL_SERVER_ERROR: CodeDescription = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  };
}
