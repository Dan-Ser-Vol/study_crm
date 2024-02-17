import { ResolveFn } from '@angular/router';
import { IApplication, IPagination } from '../../interfaces';
import { ApplicationsService } from '../applications.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const applicationsResolver: ResolveFn<
  IPagination<IApplication>
> = (): Observable<IPagination<IApplication>> => {
  const appService = inject(ApplicationsService);
  return appService.getAll();
};
