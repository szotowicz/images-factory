import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 8080;
const API_PATH_PREFIX = process.env.API_PATH_PREFIX || '';
const SWAGGER_PATH = `${API_PATH_PREFIX}/apidoc`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(API_PATH_PREFIX);

  const options = new DocumentBuilder().setTitle('Images Factory API').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  await app.listen(PORT);
}
bootstrap();
