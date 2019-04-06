import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiService: ApiService) { }

  getRoles(filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3): Observable<any> {
    return this.apiService.get('/roles',
      new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('size', pageSize.toString()));
  }
}


// findLessons(
//   courseId: number, filter = '', sortOrder = 'asc',
//   pageNumber = 0, pageSize = 3): Observable < Lesson[] > {

//     return this.http.get('/api/lessons', {
//       params: new HttpParams()
//         .set('courseId', courseId.toString())
//         .set('filter', filter)
//         .set('sortOrder', sortOrder)
//         .set('pageNumber', pageNumber.toString())
//         .set('pageSize', pageSize.toString())
//     }).pipe(
//       map(res => res["payload"])
//     );
