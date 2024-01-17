import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export abstract class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly limit?: number = 25;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly total_pages?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly total_count?: number;
}
