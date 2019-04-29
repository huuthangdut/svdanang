import { CrossFieldErrorMatcher } from './../../../core/validators/cross-field-error-matcher';
import { DateValidators } from './../../../core/validators/date.validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventSchedule } from '../../../core/models/event-schedule.model';
import { EventScheduleFormService } from '../../../core/services/forms/event-schedule-form.service';
import { DatePipeService } from '../../../shared/services/date-pipe.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-schedule-form',
  templateUrl: './event-schedule-form.component.html',
  styleUrls: ['./event-schedule-form.component.scss']
})
export class EventScheduleFormComponent implements OnInit {
  title = 'Tạo mới lịch trình';
  scheduleForm: FormGroup;
  formErrors: any;

  schedule: EventSchedule;
  isEdit: boolean = false;

  minDate: Date = new Date();
  maxDate: Date = new Date();
  existTimes: Date[] = [];

  constructor(
    public dialogRef: MatDialogRef<EventScheduleFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private scheduleFormService: EventScheduleFormService,
    private datePipeService: DatePipeService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.minDate = moment(this.data.minDate)
        .set({ hour: 0, minute: 0, second: 0 }).toDate();
      this.maxDate = moment(this.data.maxDate)
        .set({ hour: 23, minute: 59, second: 59 }).toDate();

      if (this.data.schedule) {
        this.isEdit = true;
        this.schedule = this.data.schedule;
        this.title = "Chỉnh sửa lịch trình";
      }

      if (this.data.existTimes) {
        this.existTimes = this.data.existTimes;
      }
    }

    this.formErrors = this.scheduleFormService.formErrors;

    this.buildForm();
  }

  buildForm() {
    if (this.isEdit) {
      this.scheduleForm = this.formBuilder.group({
        startTime:
          [this.datePipeService.fromUnixTimeStamp(this.schedule.startTime), [Validators.required, DateValidators.includeDate(this.existTimes)]],
        schedule: [this.schedule.schedule, Validators.required],
        location: [this.schedule.location, Validators.required]
      });
    } else {
      this.scheduleForm = this.formBuilder.group({
        startTime: [null, [Validators.required, DateValidators.includeDate(this.existTimes)]],
        schedule: [null, Validators.required],
        location: [null, Validators.required]
      });
    }

    this.scheduleForm.valueChanges.subscribe(data => this.onValueChanged());

    this.onValueChanged();

  }

  onValueChanged() {
    if (!this.scheduleForm) { return; }

    this.scheduleFormService.logValidationErrors(this.scheduleForm);

    this.formErrors = this.scheduleFormService.formErrors;
  }

  getScheduleModel() {
    const formValue = Object.assign({}, this.scheduleForm.value);

    return new EventSchedule(
      this.schedule ? this.schedule.id : null,
      this.datePipeService.toUnixTimestamp(formValue.startTime),
      null,
      formValue.location,
      formValue.schedule
    )
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.scheduleForm.valid) {
      const schedule = this.getScheduleModel();

      this.dialogRef.close(schedule);
    }
  }

}
