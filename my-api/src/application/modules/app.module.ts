import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { SecretsModule } from './secrets.module';

@Module({
  imports: [AuthModule, SecretsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
