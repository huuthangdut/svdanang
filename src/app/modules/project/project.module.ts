import { EditorModule } from '@tinymce/tinymce-angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CovalentLoadingModule } from '@covalent/core/loading';

import { SharedModule } from './../../shared/shared.module';
import { DonationListComponent } from './donation-list/donation-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectTopicFormComponent } from './project-topic-form/project-topic-form.component';
import { ProjectTopicListComponent } from './project-topic-list/project-topic-list.component';
import { DonationFormComponent } from './donation-form/donation-form.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectTopicListComponent,
    ProjectTopicFormComponent,
    DonationListComponent,
    DonationFormComponent,

  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    CovalentLoadingModule,
    EditorModule,
  ],
  entryComponents: [
    DonationFormComponent
  ]
})
export class ProjectModule { }
