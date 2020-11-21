export interface PixabayResult {
  total: number;
  totalHits: number;
  hits: Hit[];
}

interface Hit {
  id: string;
  type: string;
  pageURL: string;
  previewURL: string;
  webformatURL: string;
  largeImageURL: string;
}
