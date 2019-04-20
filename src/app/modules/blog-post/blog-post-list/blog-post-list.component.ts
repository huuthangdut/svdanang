import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { BlogPostService } from './../../../core/services/blog-post.service';
import { DialogService } from './../../../shared/services/dialog.service';
import { BlogPostsDataSource } from './blog-post.data-source';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {
  dataSource: BlogPostsDataSource;

  displayedColumns = ['thumbnailImage', 'title', 'topic', 'createdDate', 'createdBy', 'status', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;

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
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPostsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPostsPage())
      ).subscribe();
  }

  loadPostsPage() {
    this.dataSource.loadPosts(
      this.search.nativeElement.value,
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
