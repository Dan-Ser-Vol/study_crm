import { PaginationQueryDto } from '../enums';

export class ListItemsDto<T> extends PaginationQueryDto {
  data: T[];
}
