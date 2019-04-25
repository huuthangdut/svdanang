import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core/loading';
import { CalendarEvent, CalendarEventAction, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';

import { Meeting } from '../../core/models/meeting.model';
import { MeetingService } from '../../core/services/meeting.service';
import { DatePipeService } from './../../shared/services/date-pipe.service';
import { DialogService } from './../../shared/services/dialog.service';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import * as moment from 'moment';

const colors: any = {
  orange: {
    primary: '#ef6c00',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingComponent implements OnInit {

  activeDayIsOpen: boolean = false;
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  locale: string = 'vi';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  CalendarView = CalendarView;

  meetings: Meeting[] = [];
  isLoading: boolean;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil action-button"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editMeeting(event.id);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times action-button"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteMeeting(event.id);
      }
    }
  ];

  constructor(
    private meetingService: MeetingService,
    private datePipeService: DatePipeService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private loadingService: TdLoadingService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadMeetings();
  }

  loadMeetings() {
    this.startLoading();
    this.meetingService
      .getMeetingsByMonthYear(this.viewDate.getMonth() + 1, this.viewDate.getFullYear())
      .subscribe(response => {
        if (response.success) {
          this.events = [];
          this.activeDayIsOpen = false;

          this.meetings = response.data;
          this.meetings.map((meeting) => this.toCalendarEvent(meeting, this.events));
          this.refresh.next();

          this.endLoading();
        }
      })
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  onAddMeeting(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "35%";
    dialogConfig.position = { top: '10vh' }
    const dialogRef = this.dialog.open(MeetingFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.loadMeetings();
      }
    });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    this.loadMeetings();
  }

  toCalendarEvent(meeting: Meeting, events: CalendarEvent[]) {
    // check if meeting day has today
    if (isSameMonth(meeting.day, new Date())
      && isSameDay(meeting.day, new Date())) {
      this.activeDayIsOpen = true;
    }

    events.push(
      {
        id: meeting.id,
        start: this.datePipeService.fromUnixTimeStamp(meeting.startTime),
        end: this.datePipeService.fromUnixTimeStamp(meeting.endTime),
        title: meeting.title + ", " + meeting.location + ", " + moment(meeting.startTime).format('HH:mm') + " - " + moment(meeting.endTime).format('HH:mm'),
        color: colors.orange,
        actions: this.actions
      }
    )
  }

  deleteMeeting(id) {
    this.dialogService.openConfirmDialog({
      title: 'Xoá lịch họp',
      message: 'Bạn có chắc chắn muốn xoá lịch họp này?'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.meetingService.deleteMeeting(id).subscribe(
          response => this.handleDeleteSuccess(),
          error => this.handleDeleteError(error));
      }
    });


  }

  handleDeleteSuccess(): void {
    this.snackBar.open('Xoá lịch họp thành công.', '', { duration: 2000 });
    this.loadMeetings();
  }

  handleDeleteError(error: any): void {
    this.snackBar.open('Có lỗi xảy ra. Vui lòng thử lại.', '', { duration: 2000 });
  }

  editMeeting(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "35%";
    dialogConfig.position = { top: '10vh' }
    dialogConfig.data = { meetingId: id }
    const dialogRef = this.dialog.open(MeetingFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.loadMeetings();
      }
    });
  }

  startLoading() {
    this.loadingService.register('isLoading');
  }

  endLoading() {
    this.loadingService.resolve('isLoading');
  }


}
