import { AuthTokens } from '../common/types/auth.types';

export class UserPayloadDto {
  username: string;
  roles: string[];
  tokens: AuthTokens;
  constructor(
    username: string,
    roles: string[],
    accessToken: string,
    refreshToken: string,
  ) {
    this.username = username;
    this.roles = roles;
    this.tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
