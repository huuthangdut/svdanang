import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getUsers(filter = '', sortBy = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3): Observable<User[]> {
    return this.apiService.get('/users',
      new HttpParams()
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString()));
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.get('/users/me');
  }

  createUser(user) {
    return this.apiService.post('/users', user);
  }
}
