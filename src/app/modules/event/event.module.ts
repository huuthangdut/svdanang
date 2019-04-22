import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventTopicListComponent } from './event-topic-list/event-topic-list.component';
import { EventTopicFormComponent } from './event-topic-form/event-topic-form.component';
import { EventScheduleComponent } from './event-schedule/event-schedule.component';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';
import { VolunteerDetailsComponent } from './volunteer-details/volunteer-details.component';
import { EventScheduleFormComponent } from './event-schedule-form/event-schedule-form.component';
import { CovalentLoadingModule } from '@covalent/core/loading';

@NgModule({
  declarations: [
    EventListComponent,
    EventFormComponent,
    EventTopicListComponent,
    EventTopicFormComponent,
    EventScheduleComponent,
    VolunteerListComponent,
    VolunteerDetailsComponent,
    EventScheduleFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventRoutingModule,
    CovalentLoadingModule
  ],
  entryComponents: [
    EventScheduleFormComponent
  ]
})
export class EventModule { }
