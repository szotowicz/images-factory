import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ConfigModule.forRoot(), ImageModule],
})
export class AppModule {}
