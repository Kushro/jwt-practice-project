import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretsService {
  getHello(): string {
    return 'Hello World!';
  }
}
