import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private apiService: ApiService) { }

  getAll() {
    return this.apiService.get('/departments');
  }

  getDepartment(id: number) {
    return this.apiService.get(`/departments/${id}`);
  }

  createDepartment(department: Department) {
    return this.apiService.post('/departments', department);
  }

  updateDepartment(id: number, department: Department) {
    return this.apiService.put('/departments', department);
  }

  deleteDepartment(id: number) {
    return this.apiService.delete(`/departments/${id}`);
  }
}
