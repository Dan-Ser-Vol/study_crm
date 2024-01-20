export interface IPagination<T> {
  totalPages: number;
  itemsFound: number;
  totalCount: number;
  data: T[];
}
