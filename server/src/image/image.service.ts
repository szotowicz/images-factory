import { HttpService, Injectable } from '@nestjs/common';
import { GiphyService } from './giphy.service';
import { PixabayService } from './pixabay.service';
import { ImageSearchResult } from './schema/image-search-result';

@Injectable()
export class ImageService {
  constructor(
    private readonly httpService: HttpService,
    private readonly pixabayService: PixabayService,
    private readonly giphyService: GiphyService,
  ) {}

  async getImages(query: string, pageNumber = 1): Promise<ImageSearchResult> {
    console.log(`[LOG] Searched phrase is: "${query}" on page: "${pageNumber}"`);

    if (query.length === 0) {
      return null;
    }

    const limitFromSource = 10;
    const result: ImageSearchResult = {
      pageNumber: 0,
      pageCount: 0,
      data: [],
    };

    const pixabayResult: ImageSearchResult = await this.pixabayService.fetch(query, pageNumber, limitFromSource);
    if (pixabayResult) {
      result.pageNumber = pageNumber;
      result.pageCount += pixabayResult.pageCount;
      result.data = result.data.concat(pixabayResult.data);
    }

    const giphyResult: ImageSearchResult = await this.giphyService.fetch(query, pageNumber - 1, limitFromSource);
    if (giphyResult) {
      result.pageNumber = pageNumber;
      result.pageCount += giphyResult.pageCount;
      result.data = result.data.concat(giphyResult.data);
    }

    result.data.sort(() => Math.random() - 0.5);
    return result;
  }
}
