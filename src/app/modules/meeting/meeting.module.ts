import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ContextMenuModule } from 'ngx-contextmenu';

import { SharedModule } from './../../shared/shared.module';
import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';
import localeVi from '@angular/common/locales/vi';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

registerLocaleData(localeVi);

@NgModule({
  declarations: [MeetingComponent, MeetingFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxMaterialTimepickerModule,
    MeetingRoutingModule
  ],
  entryComponents: [MeetingFormComponent]
})
export class MeetingModule { }