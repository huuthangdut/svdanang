import { ApiService } from './../http/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getUsers(filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3): Observable<User[]> {
    return this.apiService.get('/roles',
      new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()));
  }
}
