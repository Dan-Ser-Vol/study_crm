import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../../../common';

export class SortByQueryDto extends PaginationQueryDto {
  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  sortedBy?: string;

  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  search?: string;
  [key: string | number]: string | number;
}
