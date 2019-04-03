import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectTopicListComponent } from './project-topic-list/project-topic-list.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'topics', component: ProjectTopicListComponent },
  { path: ':id', component: ProjectFormComponent },
  { path: 'new', component: ProjectFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
