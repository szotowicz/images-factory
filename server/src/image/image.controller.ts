import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { ImageQuery } from './schema/image-query';
import { ImageSearchResult } from './schema/image-search-result';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found images',
    type: ImageSearchResult,
  })
  @ApiResponse({
    status: 404,
    description: 'No result found',
  })
  @ApiQuery({ name: 'query', description: 'Search query term or phrase' })
  async getImages(@Query() imageQuery: ImageQuery): Promise<ImageSearchResult[]> {
    try {
      let pageNumber = 1;
      if (imageQuery.pageNumber) {
        const parsedPage = parseInt(imageQuery.pageNumber);
        if (!Number.isNaN(parsedPage)) {
          pageNumber = parsedPage;
        }
      }

      return imageQuery.query ? await this.imageService.getImages(imageQuery.query, pageNumber) : [];
    } catch (error) {
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
