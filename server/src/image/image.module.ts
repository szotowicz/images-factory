import { HttpModule, Module } from '@nestjs/common';
import { GiphyService } from './giphy.service';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { PixabayService } from './pixabay.service';

@Module({
  imports: [HttpModule],
  controllers: [ImageController],
  providers: [ImageService, PixabayService, GiphyService],
})
export class ImageModule {}
