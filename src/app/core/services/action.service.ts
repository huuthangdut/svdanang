import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private apiService: ApiService) { }

  getAll() {
    return this.apiService.get('/actions');
  }
}
