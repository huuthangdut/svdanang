import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel, UserProfileModel } from '../models';
import { UserPasswordModel } from '../models/user-password.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getUsers(filter = '', sortBy = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<any> {
    return this.apiService.get('/users',
      new HttpParams()
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString()));
  }

  getCurrentUser(): Observable<any> {
    return this.apiService.get('/users/me');
  }

  getCurrentGrantedActions() {
    return this.apiService.get('/users/me/grantedAction');
  }

  updateCurrentUser(userProfile: UserProfileModel) {
    return this.apiService.put('/users/me', userProfile);
  }

  updateCurrentUserPassword(userPassword: UserPasswordModel) {
    return this.apiService.put('/users/me/password', userPassword);
  }

  createUser(user: UserModel) {
    return this.apiService.post('/users', user);
  }

  getUser(id: number) {
    return this.apiService.get(`/users/${id}`);
  }

  updateUser(id: number, user: UserModel) {
    return this.apiService.put(`/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.apiService.delete(`/users/${id}`);
  }

  checkUsernameAvailability(username: string) {
    return this.apiService.get(`/users/checkUsernameAvailability`,
      new HttpParams().set('userName', username)
    )
  }

  checkEmailAvailability(email: string) {
    return this.apiService.get(`/users/checkEmailAvailability`,
      new HttpParams().set('email', email)
    )
  }




}
