import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { GiphyResult } from './schema/giphy-result';
import { ImageSearchResult } from './schema/image-search-result';
import { PixabayResult } from './schema/pixabay-result';

@Injectable()
export class ImageService {
  constructor(private readonly httpService: HttpService) {}

  async getImages(query: string, pageNumber = 1): Promise<ImageSearchResult[]> {
    console.log(`[LOG] Searched phrase is: ${query}`);

    if (query.length === 0) {
      return Promise.resolve([]);
    }

    const result: ImageSearchResult[] = [];
    const pixabayResult: PixabayResult = await this.fetchFromPixabay(query, pageNumber);
    const giphyResult: GiphyResult = await this.fetchFromGiphy(query, pageNumber - 1);

    // Each element parse to union format

    return result;
  }

  private async fetchFromPixabay(query: string, pageNumber = 1) {
    try {
      return await this.fetchSources(
        `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&image_type=photo&q=${query}&page=${pageNumber}&per_page=3`,
      );
    } catch (error) {
      console.log('[ERROR] Unable to fetch from sources PIXABAY. Status', error.response.status, error.response.data);
      return [];
    }
  }

  private async fetchFromGiphy(query: string, pageNumber = 0) {
    try {
      return await this.fetchSources(
        `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${query}&offset=${pageNumber}&limit=3`,
      );
    } catch (error) {
      console.log('[ERROR] Unable to fetch from sources GIPHY. Status', error.response.status, error.response.data);
      return [];
    }
  }

  private async fetchSources(url: string) {
    return this.httpService
      .get(url)
      .pipe(map((response) => response.data))
      .toPromise();
  }
}
