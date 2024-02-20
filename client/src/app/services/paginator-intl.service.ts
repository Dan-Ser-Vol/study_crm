import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginatorIntlService extends MatPaginatorIntl {
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (page===0) {
      return `${Math.ceil(length / pageSize)} pages`;
    }else {
      return `Page ${page} of ${Math.ceil(length / pageSize)}`;
    }
  };
}
