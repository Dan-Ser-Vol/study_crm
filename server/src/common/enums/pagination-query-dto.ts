import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export abstract class PaginationQueryDto {
  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly page?: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly totalPages?: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly itemsFound?: number;

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly totalCount?: number;
}
