import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EventTopicService {

  constructor(private apiService: ApiService) { }

  getAll() {
    return this.apiService.get('/event-topics');
  }
}
