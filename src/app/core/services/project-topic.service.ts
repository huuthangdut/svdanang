import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectTopicService {

  constructor(private apiService: ApiService) { }

  getAll() {
    return this.apiService.get('/project-topics');
  }
}
