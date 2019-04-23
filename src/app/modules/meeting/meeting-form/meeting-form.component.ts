import { DatePipeService } from './../../../shared/services/date-pipe.service';
import { MeetingService } from './../../../core/services/meeting.service';
import { DateValidators } from './../../../core/validators/date.validator';
import { MeetingFormService } from './../../../core/services/forms/meeting-form.service';
import { Meeting } from './../../../core/models/meeting.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../../../core/validators/cross-field-error-matcher';
import { TdLoadingService } from '@covalent/core/loading';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.scss']
})
export class MeetingFormComponent implements OnInit {
  title = 'Tạo mới cuộc họp'

  meetingId: number;
  meeting: Meeting;
  isEdit: boolean = false;

  meetingForm: FormGroup;

  formErrors: any;
  errorMatcher = new CrossFieldErrorMatcher();

  submitting: boolean;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private meetingFormService: MeetingFormService,
    private datePipeService: DatePipeService,
    private snackBar: MatSnackBar,
    private loadingService: TdLoadingService) {

  }

  ngOnInit() {
    if (this.data && this.data.meetingId) {
      this.isEdit = true;
      this.title = 'Chỉnh sửa cuộc họp';
    }

    this.formErrors = this.meetingFormService.formErrors;
    this.buildForm();
  }

  buildForm() {
    this.meetingForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      day: [null, Validators.required],
      timeGroup: this.formBuilder.group({
        startTime: [null, Validators.required],
        endTime: [null, Validators.required]
      }, { validators: DateValidators.dateRange }),
      location: [null, Validators.required]
    })

    if (this.isEdit) {
      this.getMeetingAndPopularForm(this.data.meetingId);
    }

    this.meetingForm.valueChanges.subscribe(data => this.onValueChanged());
  }

  onValueChanged(): void {
    if (!this.meetingForm) { return; }

    this.meetingFormService.logValidationErrors(this.meetingForm);
    this.formErrors = this.meetingFormService.formErrors;
  }

  getMeetingAndPopularForm(id: number) {
    this.startLoading();
    this.meetingService.getMeeting(id).subscribe(response => {
      if (response.success) {
        this.meeting = response.data;
        this.setFormValue(this.meeting);
        this.meetingFormService.markDirty(this.meetingForm);
        this.meetingForm.updateValueAndValidity();

        this.endLoading();
      }
    })
  }

  setFormValue(meeting: Meeting) {
    this.meetingForm.patchValue({
      title: meeting.title,
      content: meeting.content,
      day: this.datePipeService.fromUnixTimeStamp(meeting.day),
      timeGroup: {
        startTime: this.datePipeService.fromUnixTimeStamp(meeting.startTime),
        endTime: this.datePipeService.fromUnixTimeStamp(meeting.endTime)
      },
      location: meeting.location
    })
  }


  startLoading() {
    this.loadingService.register('loading');
  }

  endLoading() {
    this.loadingService.resolve('loading');
  }

  getSubmitModel(): Meeting {
    const formValue = Object.assign({}, this.meetingForm.value);

    // reset time of day to 00:00:00
    let day = this.datePipeService.resetTime(formValue.day);

    // set day of startTime and endTime = day
    let startTime = this.datePipeService.setDate(formValue.timeGroup.startTime, formValue.day);
    let endTime = this.datePipeService.setDate(formValue.timeGroup.endTime, formValue.day);

    console.log("day:" + day.format('DD/MM/YYYY HH:mm:ss'));
    console.log("startTime:" + startTime.format('DD/MM/YYYY HH:mm:ss'));
    console.log("endTime:" + endTime.format('DD/MM/YYYY HH:mm:ss'));

    return {
      id: this.meeting ? this.meeting.id : null,
      title: formValue.title,
      content: formValue.content,
      day: this.datePipeService.toUnixTimestamp(day),
      startTime: this.datePipeService.toUnixTimestamp(startTime),
      endTime: this.datePipeService.toUnixTimestamp(endTime),
      location: formValue.location
    }
  }

  onSubmit() {
    this.submitting = true;
    this.startLoading();

    if (this.meetingForm.valid) {
      const meeting = this.getSubmitModel();

      if (this.isEdit) {
        this.meetingService.updateMeeting(meeting.id, meeting).subscribe(
          response => this.handleSubmitSuccess(response),
          error => this.handleSubmitError(error)
        );
      } else {
        this.meetingService.createMeeting(meeting).subscribe(
          response => this.handleSubmitSuccess(response),
          error => this.handleSubmitError(error)
        )
      }
    }


  }

  handleSubmitSuccess(response) {
    this.submitting = false;
    this.endLoading();
    const message = this.isEdit ? "Cập nhật cuộc họp thành công" : "Thêm cuộc họp thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });

    this.dialogRef.close(true);
  }

  handleSubmitError(error) {
    this.submitting = false;
    this.endLoading();
    console.log(error);

    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.", '', {
      duration: 2000,
    });
  }



}