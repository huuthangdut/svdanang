import { CrossFieldErrorMatcher } from './../../../core/validators/cross-field-error-matcher';
import { DateValidators } from './../../../core/validators/date.validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventSchedule } from '../../../core/models/event-schedule.model';
import { EventScheduleFormService } from '../../../core/services/forms/event-schedule-form.service';
import { DatePipeService } from '../../../shared/services/date-pipe.service';

@Component({
  selector: 'app-event-schedule-form',
  templateUrl: './event-schedule-form.component.html',
  styleUrls: ['./event-schedule-form.component.scss']
})
export class EventScheduleFormComponent implements OnInit {
  title = 'Tạo mới lịch trình';
  scheduleForm: FormGroup;
  formErrors: any;
  errorMatcher = new CrossFieldErrorMatcher();

  schedule: EventSchedule;
  isEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EventScheduleFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private scheduleFormService: EventScheduleFormService,
    private datePipeService: DatePipeService
  ) { }

  ngOnInit() {
    if (this.data && this.data.schedule) {
      this.isEdit = true;
      this.schedule = this.data.schedule;
      this.title = "Chỉnh sửa lịch trình";
    }

    this.formErrors = this.scheduleFormService.formErrors;

    this.buildForm();
  }

  buildForm() {
    if (this.isEdit) {
      this.scheduleForm = this.formBuilder.group({
        dateGroup: this.formBuilder.group({
          startTime: [this.datePipeService.fromUnixTimeStamp(this.schedule.startTime), Validators.required],
          endTime: [this.datePipeService.fromUnixTimeStamp(this.schedule.endTime), Validators.required]
        }, { validators: DateValidators.dateRange }),
        schedule: [this.schedule.schedule, Validators.required],
        location: [this.schedule.location, Validators.required]
      });
    } else {
      this.scheduleForm = this.formBuilder.group({
        dateGroup: this.formBuilder.group({
          startTime: [new Date(), Validators.required],
          endTime: [new Date(), Validators.required],
        }, { validators: DateValidators.dateRange }),
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

    console.log(this.formErrors);
  }

  getScheduleModel() {
    const formValue = Object.assign({}, this.scheduleForm.value);

    return new EventSchedule(
      this.schedule ? this.schedule.id : null,
      this.datePipeService.toUnixTimestamp(formValue.startTime),
      this.datePipeService.toUnixTimestamp(formValue.endTime),
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
