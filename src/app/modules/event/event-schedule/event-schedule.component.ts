import { DatePipeService } from './../../../shared/services/date-pipe.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { EventScheduleFormComponent } from '../event-schedule-form/event-schedule-form.component';
import { EventSchedule } from './../../../core/models/event-schedule.model';
import * as moment from 'moment';

@Component({
  selector: 'app-event-schedule',
  templateUrl: './event-schedule.component.html',
  styleUrls: ['./event-schedule.component.scss']
})
export class EventScheduleComponent implements OnInit {
  @Input() schedules: EventSchedule[] = [];
  @Input() minDate: Date;
  @Input() maxDate: Date;

  @Output() changeSchedules: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private datePipeService: DatePipeService) { }

  ngOnInit() {
    this.schedules.sort(this.compareDate);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "650px";
    dialogConfig.position = { top: '15vh' }
    dialogConfig.data = { minDate: this.minDate, maxDate: this.maxDate, existTimes: this.schedules.map(i => this.datePipeService.fromUnixTimeStamp(i.startTime)) }

    let dialogRef = this.dialog.open(EventScheduleFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((data) => {
        if (data) {
          this.schedules.push(data);
          this.schedules.sort(this.compareDate);
          this.changeSchedules.emit(this.schedules);
        }
      });
  }

  onEdit(schedule: EventSchedule, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "650px";
    dialogConfig.position = { top: '15vh' }
    dialogConfig.data = { minDate: this.minDate, maxDate: this.maxDate, schedule: schedule, existTimes: this.schedules.map(i => this.datePipeService.fromUnixTimeStamp(i.startTime)) }

    let dialogRef = this.dialog.open(EventScheduleFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((data) => {
        if (data) {
          this.schedules.splice(index, 1);
          this.schedules.push(data);
          this.schedules.sort(this.compareDate);
          this.changeSchedules.emit(this.schedules);
        }
      });
  }

  onRemoveSchedule(index) {
    this.schedules.splice(index, 1);
    this.schedules.sort(this.compareDate);
    this.changeSchedules.emit(this.schedules);
  }

  private compareDate(date1, date2) {
    if (date1.startTime > date2.startTime) {
      return 1;
    } else if (date1.startTime == date2.startTime) {
      return 0;
    }

    return -1;

    // if (date1.startTime > date2.startTime) {
    //   return 1;
    // } else if (date1.startTime == date2.startTime) {
    //   if (date1.endTime > date2.endTime) {
    //     return 1;
    //   } else if (date1.endTime < date2.endTime) {
    //     return -1;
    //   }
    //   else return 0;
    // } else
    //   return -1;
  }

}
