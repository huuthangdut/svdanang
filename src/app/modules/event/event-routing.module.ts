import { EventTopicListComponent } from './event-topic-list/event-topic-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'topics', component: EventTopicListComponent },
  { path: ':id', component: EventFormComponent },
  { path: 'new', component: EventFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
