import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class SortByQueryDto {
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
