export interface GiphyResult {
  data: Data[];
  pagination: Pagination;
}

interface Data {
  id: string;
  type: string;
  url: string;
  images: {
    downsized_small: {
      mp4: string;
    };
    downsized_medium: {
      url: string;
    };
    downsized_large: {
      url: string;
    };
  };
}

interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}
