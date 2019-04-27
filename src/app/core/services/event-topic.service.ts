import { TopicService } from './topic.service';
import { Topic } from './../models/topic.model';
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

  getTopic(id) {
    return this.apiService.get(`/event-topics/${id}`);
  }

  createTopic(topic: Topic) {
    return this.apiService.post(`/event-topics`, topic);
  }

  updateTopic(id: number, topic: Topic) {
    return this.apiService.post(`/event-topics/${id}`, topic);
  }

  deleteTopic(id: number) {
    return this.apiService.delete(`/event-topics/${id}`);
  }
}
