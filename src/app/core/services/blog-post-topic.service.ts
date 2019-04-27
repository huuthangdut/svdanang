import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

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
}
