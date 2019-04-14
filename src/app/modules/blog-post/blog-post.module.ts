import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { BlogPostFormComponent } from './blog-post-form/blog-post-form.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';
import { BlogPostRoutingModule } from './blog-post-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    BlogPostListComponent,
    BlogPostFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogPostRoutingModule,
    CKEditorModule
  ]
})
export class BlogPostModule { }
