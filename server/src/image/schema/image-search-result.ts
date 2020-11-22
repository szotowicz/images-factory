import { ApiProperty } from '@nestjs/swagger';
import { Image } from './image';

export class ImageSearchResult {
  @ApiProperty({ type: [Image] })
  data: Image[];
  @ApiProperty()
  pageNumber: number;
}
