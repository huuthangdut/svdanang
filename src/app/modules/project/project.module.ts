import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectTopicListComponent } from './project-topic-list/project-topic-list.component';
import { ProjectTopicFormComponent } from './project-topic-form/project-topic-form.component';
import { DonationListComponent } from './donation-list/donation-list.component';
import { DonationDetailsComponent } from './donation-details/donation-details.component';

@NgModule({
  declarations: [ProjectListComponent, ProjectFormComponent, ProjectTopicListComponent, ProjectTopicFormComponent, DonationListComponent, DonationDetailsComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
