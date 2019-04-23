import { CommonModule, registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { NgModule } from '@angular/core';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

import { SharedModule } from './../../shared/shared.module';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';
import { ColorPickerModule } from 'ngx-color-picker';

registerLocaleData(localeVi);

@NgModule({
  declarations: [MeetingComponent, MeetingFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MeetingRoutingModule,
    CovalentLoadingModule,
    ColorPickerModule

  ],
  entryComponents: [MeetingFormComponent]
})
export class MeetingModule { }
