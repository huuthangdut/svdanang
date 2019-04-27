import { Injectable } from '@angular/core';

import { Topic } from './../models/topic.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  url: string;

  constructor(
    private apiService: ApiService
  ) { }

  setType(type: string) {
    switch (type) {
      case 'event':
        this.url = '/event-topics';
        break;
      case 'project':
        this.url = '/project-topics';
        break;
      case 'blog':
        this.url = '/blog-topics';
        break;
    }
  }

  getTopic(id: number) {
    return this.apiService.get(`${this.url}/${id}`);
  }

  createTopic(topic: Topic) {
    return this.apiService.post(this.url, topic);
  }

  updateTopic(id: number, topic: Topic) {
    return this.apiService.put(this.url, topic);
  }

  deleteTopic(id: number) {
    return this.apiService.delete(`${this.url}/${id}`);
  }
}