import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty()
  id: string;
  @ApiProperty()
  url: string;
}
