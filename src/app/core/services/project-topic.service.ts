import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Topic } from '../models/topic.model';
import { TopicService } from './topic.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectTopicService {

  constructor(private apiService: ApiService) { }

  getAll() {
    return this.apiService.get('/project-topics');
  }

  getTopic(id) {
    return this.apiService.get(`/project-topics/${id}`);
  }

  createTopic(topic: Topic) {
    return this.apiService.post(`/project-topics`, topic);
  }

  updateTopic(id: number, topic: Topic) {
    return this.apiService.post(`/project-topics/${id}`, topic);
  }

  deleteTopic(id: number) {
    return this.apiService.delete(`/project-topics/${id}`);
  }
}
