import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';

import { BlogPost } from '../../../core/models';
import { BlogPostService } from '../../../core/services/blog-post.service';

export class BlogPostsDataSource implements DataSource<BlogPost> {
  private postsSubject = new BehaviorSubject<BlogPost[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public page: number;
  public pageSize: number;
  public totalElements: number;

  constructor(private blogPostService: BlogPostService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<BlogPost[]> {
    return this.postsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.postsSubject.complete();
    this.loadingSubject.complete();
  }

  loadPosts(filter = '', sortBy = '',
    sortDirection = 'asc', pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.blogPostService.getPosts(filter, sortBy, sortDirection, pageIndex, pageSize)
      .pipe(
        first(),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response: any) => {
        if (response.success) {
          let posts = response.data.content;
          this.page = response.data.page;
          this.pageSize = response.data.size;
          this.totalElements = response.data.totalElements;
          this.postsSubject.next(posts);
        }
      });
  }
}

