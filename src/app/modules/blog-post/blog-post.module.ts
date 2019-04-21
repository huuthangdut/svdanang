import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { BlogPostFormComponent } from './blog-post-form/blog-post-form.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';
import { BlogPostRoutingModule } from './blog-post-routing.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CovalentLoadingModule } from '@covalent/core/loading';

@NgModule({
  declarations: [
    BlogPostListComponent,
    BlogPostFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogPostRoutingModule,
    EditorModule,
    CovalentLoadingModule
  ]
})
export class BlogPostModule { }
