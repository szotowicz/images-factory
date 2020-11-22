import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { GiphyResult } from './schema/giphy-result';
import { Image } from './schema/image';
import { ImageSearchResult } from './schema/image-search-result';

@Injectable()
export class GiphyService {
  constructor(private readonly httpService: HttpService) {}

  async fetch(query: string, pageNumber: number, limit: number): Promise<ImageSearchResult> {
    if (query.length === 0) {
      return null;
    }

    const giphyResult: GiphyResult = await this.fetchFromGiphy(query, pageNumber, limit);
    return giphyResult ? this.parseGiphyResult(giphyResult) : null;
  }

  private async fetchFromGiphy(query: string, pageNumber: number, limit: number): Promise<GiphyResult> {
    try {
      return await this.httpService
        .get(
          `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=${query}&offset=${
            pageNumber * limit
          }&limit=${limit}`,
        )
        .pipe(map((response) => response.data))
        .toPromise();
    } catch (error) {
      console.log('[ERROR] Unable to fetch from sources GIPHY. Status', error.response.status, error.response.data);
      return null;
    }
  }

  private parseGiphyResult(giphyResult: GiphyResult) {
    const result: ImageSearchResult = {
      pageNumber: null,
      data: giphyResult.data.map((r) => {
        const image: Image = {
          id: r.id,
          type: r.type,
          pageURL: r.url,
          smallImageURL: r.images.downsized_small.mp4,
          mediumImageURL: r.images.downsized_medium.url,
          largeImageURL: r.images.downsized_large.url,
        };
        return image;
      }),
    };

    return result;
  }
}
