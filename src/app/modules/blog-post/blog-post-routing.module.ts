import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogPostFormComponent } from './blog-post-form/blog-post-form.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';

const routes: Routes = [
  { path: '', component: BlogPostListComponent },
  { path: ':id', component: BlogPostFormComponent },
  { path: 'new', component: BlogPostFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogPostRoutingModule { }
