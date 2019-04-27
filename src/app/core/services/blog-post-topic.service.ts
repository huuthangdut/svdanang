import { TopicService } from './topic.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Topic } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostTopicService {

  constructor(private apiService: ApiService) { }

  getAll() {
    return this.apiService.get('/blog-topics',
      new HttpParams()
        .set('filter', '')
        .set('sortBy', '')
        .set('sortOrder', '')
        .set('page', 0 + '')
        .set('pageSize', 100 + ''));
  }

  getTopic(id) {
    return this.apiService.get(`/blog-topics/${id}`);
  }

  createTopic(topic: Topic) {
    return this.apiService.post(`/blog-topics`, topic);
  }

  updateTopic(id: number, topic: Topic) {
    return this.apiService.post(`/blog-topics/${id}`, topic);
  }

  deleteTopic(id: number) {
    return this.apiService.delete(`/blog-topics/${id}`);
  }
}
