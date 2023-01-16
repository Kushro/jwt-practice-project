import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from '../dtos/login-payload.dto';
import { RefreshTokenPayloadDto } from '../dtos/refresh-token-payload.dto';
import UserEntity from '../entities/user.entity';
import { UserPayloadDto } from '../dtos/user-payload.dto';
import { AuthTokens } from '../common/types/auth.types';
import { StatusCodes } from '../common/codes/status.codes';

@Injectable()
export class AuthService {
  private readonly _refreshTokenPrivateKey: string;
  private readonly _hardCodedUserData: UserEntity;
  constructor(private readonly _jwtService: JwtService) {
    this._refreshTokenPrivateKey = 'myPrivateRefreshKey';
    this._hardCodedUserData = {
      username: 'admin',
      password: '123',
      roles: ['admin'],
    };
  }
  authenticate(payload: LoginPayloadDto): UserPayloadDto {
    try {
      if (
        payload.username !== this._hardCodedUserData.username ||
        payload.password !== this._hardCodedUserData.password
      ) {
        throw new Error('... The provided login credentials are invalid ...');
      }

      const userData = {
        username: this._hardCodedUserData.username,
        roles: this._hardCodedUserData.roles,
      };

      return {
        ...userData,
        tokens: {
          accessToken: this._jwtService.sign(userData),
          refreshToken: this._jwtService.sign(userData, {
            secret: this._refreshTokenPrivateKey,
            expiresIn: '1d',
          }),
        },
      };
    } catch (e) {
      throw new UnauthorizedException({
        ...StatusCodes.UNAUTHORIZED,
        detail: e.message,
      });
    }
  }

  refresh(payload: RefreshTokenPayloadDto): UserPayloadDto {
    try {
      const oldTokenData = this._jwtService.verify(payload.refreshToken, {
        secret: this._refreshTokenPrivateKey,
      });

      const userData = {
        username: oldTokenData.username,
        roles: oldTokenData.roles,
      };

      const newTokens: AuthTokens = {
        accessToken: this._jwtService.sign(userData),
        refreshToken: this._jwtService.sign(userData, {
          secret: this._refreshTokenPrivateKey,
          expiresIn: '1d',
        }),
      };

      return new UserPayloadDto(
        oldTokenData.username,
        oldTokenData.roles,
        newTokens.accessToken,
        newTokens.refreshToken,
      );
    } catch (e) {
      throw new UnauthorizedException({
        ...StatusCodes.UNAUTHORIZED,
        detail: e.message,
      });
    }
  }
}
