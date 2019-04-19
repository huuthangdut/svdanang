import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private apiService: ApiService) { }

  getPosts(filter = '', sortBy = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<any> {
    return this.apiService.get('/blog-posts',
      new HttpParams()
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString()));
  }

  getPost(id: number): any {
    return this.apiService.get(`/blog-posts/${id}`);
  }

  createPost(post) {
    return this.apiService.post(`/blog-posts`, post);
  }

  updatePost(id: number, post) {
    return this.apiService.put(`/blog-posts/${id}`, post);
  }

  deletePost(id: number): any {
    return this.apiService.delete(`/blog-posts/${id}`);
  }
}
