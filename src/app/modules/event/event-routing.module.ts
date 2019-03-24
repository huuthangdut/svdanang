import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: ':id', component: EventFormComponent },
  { path: 'new', component: EventFormComponent },
  // { path: 'topics', component: EventTopicListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
