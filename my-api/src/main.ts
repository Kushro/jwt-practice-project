import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('My api')
    .setDescription('Used for learning purposes')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addSecurity('access-token', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(3001);
}

bootstrap().then(() => {
  console.log('... Swagger => http://localhost:3001/api/documentation ...');
});
