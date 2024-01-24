export interface IPagination<T> {
  totalPages: number;
  itemsFound: number;
  totalCount: number;
  page: number;
  data: T[];
}
