import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '../../../../common';
import { OrderFieldEnum } from '../../enums/list-order-field.enum';
import { OrderEnum } from '../../enums/order.enum';

export class ListQueryRequestDto extends PaginationQueryDto {
  @IsEnum(OrderEnum)
  @IsOptional()
  order?: OrderEnum = OrderEnum.ASC;

  @IsEnum(OrderFieldEnum)
  @IsOptional()
  orderBy?: OrderFieldEnum = OrderFieldEnum.id;

  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  search?: string;
}
