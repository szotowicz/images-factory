import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty()
  id: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  pageURL: string;
  @ApiProperty()
  smallImageURL: string;
  @ApiProperty()
  mediumImageURL: string;
  @ApiProperty()
  largeImageURL: string;
}
