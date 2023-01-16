import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { StatusCodes } from '../../core/common/codes/status.codes';
import * as CommonConstants from '../../core/common/constants/common.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<
      IncomingMessage & { user?: Record<string, unknown> }
    >(context);
    try {
      const token = this.getToken(request);
      const user = this._jwtService.verify(token);
      request.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        ...StatusCodes.UNAUTHORIZED,
        detail: e.toString(),
      });
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: {
    headers: Record<string, string | string[]>;
  }): string {
    const authorization = request.headers[CommonConstants.AuthorizationHeader];
    if (!authorization || Array.isArray(authorization))
      throw new Error(
        '... Failed to verify the token because the authorization header is invalid ...',
      );

    const [_, token] = authorization.split(' ');
    return token;
  }
}
