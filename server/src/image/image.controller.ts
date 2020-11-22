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
  async getImages(@Query() imageQuery: ImageQuery): Promise<ImageSearchResult> {
    if (!imageQuery.query) {
      throw new HttpException('WRONG_REQUEST_QUERY', HttpStatus.BAD_REQUEST);
    }

    try {
      let pageNumber = 1;
      if (imageQuery.pageNumber) {
        const parsedPage = parseInt(imageQuery.pageNumber);
        if (!Number.isNaN(parsedPage) && parsedPage > 0) {
          pageNumber = parsedPage;
        }
      }

      return await this.imageService.getImages(imageQuery.query, pageNumber);
    } catch (error) {
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
