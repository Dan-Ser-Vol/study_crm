export interface IList<T> {
  data: T[];
  page: number;
  limit: number;
  itemsFound: number;
  totalCount: number;
  totalPages: number;
}
