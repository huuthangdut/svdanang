import { DialogService } from './../../../shared/services/dialog.service';
import { Router } from '@angular/router';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, of, fromEvent, merge } from 'rxjs';
import { catchError, finalize, debounceTime, distinctUntilChanged, tap, first } from 'rxjs/operators';

import { BlogPost } from './../../../core/models/blog-post.model';
import { BlogPostService } from './../../../core/services/blog-post.service';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {
  dataSource: BlogPostsDataSource;

  displayedColumns = ['thumbnailImage', 'title', 'shortDescription', 'createdDate', 'createdBy', 'isPublish', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private blogPostService: BlogPostService,
    private dialogService: DialogService,
    private router: Router) { }

  ngOnInit() {
    this.dataSource = new BlogPostsDataSource(this.blogPostService);
    this.dataSource.loadPosts();
  }

  ngAfterViewInit() {
    // server-side search
    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;
    //       this.loadPostsPage();
    //     })
    //   )
    //   .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPostsPage())
      ).subscribe();
  }

  loadPostsPage() {
    this.dataSource.loadPosts(
      // this.input.nativeElement.value,
      '',
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onCreate() {
    this.router.navigate(['/posts/new']);
  }

  onEdit(id: number) {
    this.router.navigate(['/posts', id])
  }

  onDelete(id: number) {
    this.dialogService.openConfirmDialog({
      title: 'Xoá bài đăng',
      message: 'Bạn có chắc chắn muốn xoá bài đăng này?'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.blogPostService.deletePost(id).subscribe(() =>
          this.loadPostsPage());
      }
    });
  }



}


class BlogPostsDataSource implements DataSource<BlogPost> {
  private postsSubject = new BehaviorSubject<BlogPost[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

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

