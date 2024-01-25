import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginatorIntlService extends MatPaginatorIntl {
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (page === 0) {
      page = 1;
    }
    return `Page ${page} of ${Math.ceil(length / pageSize)}`;
  };
}
