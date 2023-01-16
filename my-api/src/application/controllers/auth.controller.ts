import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../core/services/auth.service';
import { LoginPayloadDto } from '../../core/dtos/login-payload.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginHttpBody } from '../documentation/login-http.body';
import { RefreshTokenHttpBody } from '../documentation/refresh-token-http.body';
import { RefreshTokenPayloadDto } from '../../core/dtos/refresh-token-payload.dto';
import { UserPayloadDto } from '../../core/dtos/user-payload.dto';

@Controller('/auth')
@ApiTags('Auth Controller')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/token')
  @ApiBody({ type: LoginHttpBody })
  public getToken(@Body() body: LoginHttpBody): UserPayloadDto {
    const payload = new LoginPayloadDto(body.username, body.password);

    return this._authService.authenticate(payload);
  }
  @Post('/refresh')
  @ApiBody({ type: RefreshTokenHttpBody })
  public refreshToken(@Body() body: RefreshTokenHttpBody): UserPayloadDto {
    const payload = new RefreshTokenPayloadDto(
      body.accessToken,
      body.refreshToken,
    );

    return this._authService.refresh(payload);
  }
}
