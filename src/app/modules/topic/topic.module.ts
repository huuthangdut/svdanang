import { CovalentLoadingModule } from '@covalent/core/loading';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRoutingModule } from './topic-routing.module';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicFormComponent } from './topic-form/topic-form.component';

@NgModule({
  declarations: [
    TopicListComponent,
    TopicFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    TopicRoutingModule,
    CovalentLoadingModule
  ],
  entryComponents: [TopicFormComponent]
})
export class TopicModule { }
