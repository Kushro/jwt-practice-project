import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../../core/services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    {
      ...JwtModule.register({
        secret: 'myPrivateKey',
        signOptions: {
          expiresIn: '60s',
        },
      }),
      global: true,
    },
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
