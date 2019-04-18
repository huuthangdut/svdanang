import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private apiService: ApiService) { }

  getAll() {
    return this.apiService.get('/departments');
  }
}
