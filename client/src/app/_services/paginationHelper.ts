import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { PaginatedResult } from '../_domain/pagination';

export function getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
  let params = new HttpParams();
  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());
  return params;
}

export function getPaginatedResult<T>(url: string, params: HttpParams, http: HttpClient): Observable<PaginatedResult<T>> {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult();
  return http.get<T>(url, { observe: 'response', params }).pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination')) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}
