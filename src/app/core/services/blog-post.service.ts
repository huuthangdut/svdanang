import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../http/api.service';
import { BlogPost } from './../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private apiService: ApiService) { }

  getPosts(filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3): Observable<BlogPost[]> {
    return this.apiService.get('/posts',
      new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()));
  }
}
