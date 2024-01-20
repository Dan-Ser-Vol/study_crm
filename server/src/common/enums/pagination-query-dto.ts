import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export abstract class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly page?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly limit?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly totalPages?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly itemsFound?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly totalCount?: number;
}
