import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Image } from './schema/image';
import { ImageSearchResult } from './schema/image-search-result';
import { PixabayResult } from './schema/pixabay-result';

@Injectable()
export class PixabayService {
  constructor(private readonly httpService: HttpService) {}

  async fetch(query: string, pageNumber: number, limit: number): Promise<ImageSearchResult> {
    if (query.length === 0) {
      return null;
    }

    const pixabayResult: PixabayResult = await this.fetchFromPixabay(query, pageNumber, limit);
    return pixabayResult ? this.parsePixabayResult(pixabayResult) : null;
  }

  private async fetchFromPixabay(query: string, pageNumber: number, limit: number): Promise<PixabayResult> {
    try {
      return await this.httpService
        .get(
          `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&image_type=photo&q=${query}&page=${pageNumber}&per_page=${limit}`,
        )
        .pipe(map((response) => response.data))
        .toPromise();
    } catch (error) {
      console.log('[ERROR] Unable to fetch from sources PIXABAY. Status', error.response.status, error.response.data);
      return null;
    }
  }

  private parsePixabayResult(pixabayResult: PixabayResult) {
    const result: ImageSearchResult = {
      pageNumber: null,
      pageCount: 10, // TODO ile? jest ogolnie?
      data: pixabayResult.hits.map((r) => {
        const image: Image = {
          id: String(r.id),
          type: r.type,
          pageURL: r.pageURL,
          smallImageURL: r.previewURL,
          mediumImageURL: r.webformatURL,
          largeImageURL: r.largeImageURL,
        };
        return image;
      }),
    };

    return result;
  }
}
