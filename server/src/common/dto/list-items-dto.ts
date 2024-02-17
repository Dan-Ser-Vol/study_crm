import { ApiProperty } from '@nestjs/swagger';

import { PaginationQueryDto } from '../enums';

export class ListItemsDto<T> extends PaginationQueryDto {
  @ApiProperty({ type: [Object] })
  data: T[];
}
