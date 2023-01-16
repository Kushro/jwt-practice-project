import { Controller, Get } from '@nestjs/common';
import { Secrecy, SwaggerToken } from '../decorators/app.decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('/secrets')
@ApiTags('Secrets Controller')
export class SecretsController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get('/public')
  public getPublicData(): string {
    return 'Public hello!';
  }

  @Secrecy()
  @Get('/private')
  @SwaggerToken()
  public getPrivateData(): string {
    return 'Private hello!';
  }
}
