import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiService: ApiService) { }

  getRoles(filter = '', sortBy = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<any> {
    return this.apiService.get('/roles',
      new HttpParams()
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString()));
  }

  getRole(id: number) {
    return this.apiService.get(`/roles/${id}`);
  }

  createRole(role) {
    return this.apiService.post('/roles', role);
  }

  updateRole(id, role) {
    return this.apiService.put(`/roles/${id}`, role);
  }

  deleteRole(id: number): any {
    return this.apiService.delete(`/roles/${id}`);
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
