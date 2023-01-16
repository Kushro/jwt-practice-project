import { SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ApiSecurity } from '@nestjs/swagger';

export const Public: any = () => SetMetadata('isPublic', true);
export const Secrecy: any = () => UseGuards(AuthGuard);
export const SwaggerToken: any = () => ApiSecurity('access-token');
