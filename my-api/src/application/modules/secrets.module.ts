import { Module } from '@nestjs/common';
import { SecretsService } from '../../core/services/secrets.service';
import { SecretsController } from '../controllers/secrets.controller';

@Module({
  imports: [],
  controllers: [SecretsController],
  providers: [SecretsService],
})
export class SecretsModule {}
