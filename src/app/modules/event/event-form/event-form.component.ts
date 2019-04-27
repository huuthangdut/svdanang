import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TdLoadingService } from '@covalent/core/loading';

import { EventSchedule } from '../../../core/models/event-schedule.model';
import { Event, EventModel } from '../../../core/models/event.model';
import { UploadService } from '../../../core/services/upload.service';
import { CrossFieldErrorMatcher } from '../../../core/validators/cross-field-error-matcher';
import { DateValidators } from '../../../core/validators/date.validator';
import { DatePipeService } from '../../../shared/services/date-pipe.service';
import { CurrencyService } from './../../../core/services/currency.service';
import { EventTopicService } from './../../../core/services/event-topic.service';
import { EventService } from './../../../core/services/event.service';
import { EventFormService } from './../../../core/services/forms/event-form.service';
import { switchMap, map } from 'rxjs/operators';
import { TINY_MCE_SETTINGS } from '../../../shared/settings/editor.setting';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  file: File;
  thumbnailImage: string;

  title = 'Tạo mới sự kiện';
  topics = [];
  currencies = [];
  schedules: EventSchedule[] = [];

  eventId: number;
  event: Event;
  isEdit: boolean = false;

  eventForm: FormGroup;

  formErrors: any;
  errorMatcher = new CrossFieldErrorMatcher();

  submitting: boolean;
  loading: boolean;

  maxDate: Date;
  minDate: Date;

  tinyMCE = TINY_MCE_SETTINGS;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private currencyService: CurrencyService,
    private eventService: EventService,
    private eventFormService: EventFormService,
    private eventTopicService: EventTopicService,
    private datePipeService: DatePipeService,
    private loadingService: TdLoadingService,
    private uploadService: UploadService,
    private snackBar: MatSnackBar) {

    let param = +this.route.snapshot.paramMap.get('id');
    param = !isNaN(param) ? param : null;
    if (param) {
      this.eventId = param;
      this.isEdit = true;
      this.title = 'Chỉnh sửa sự kiện';
    }
  }

  ngOnInit() {
    this.formErrors = this.eventFormService.formErrors;
    this.loadCurrencies();
    this.loadEventTopics();

    this.buildForm();
  }

  loadEventTopics() {
    this.eventTopicService.getAll().subscribe(response => {
      if (response.success) {
        this.topics = response.data;
      }
    });
  }

  loadCurrencies() {
    this.currencyService.getAll().subscribe(response => {
      if (response.success) {
        this.currencies = response.data;
      }
    });
  }

  changeEventSchedules(schedules: EventSchedule[]) {
    this.schedules = schedules;
  }

  buildForm() {
    this.eventForm = this.formBuilder.group({
      name: [null, Validators.required],
      shortDescription: null,
      description: null,
      topicId: [null, Validators.required],
      dateGroup: this.formBuilder.group({
        startTime: [null, [Validators.required]],
        endTime: [null, [Validators.required]],
      }, { validators: DateValidators.dateRange }),
      location: [null, Validators.required],
      expectedQuantity: [null, Validators.required],
      fee: [null, Validators.required],
      currencyId: [null, Validators.required]
    });

    if (this.isEdit) {
      this.getEventAndPopulateForm(this.eventId);
    }

    this.eventForm.valueChanges.subscribe(data => this.onValueChanged());

    this.onValueChanged();
  }

  onValueChanged(): void {
    if (!this.eventForm) { return; }

    this.eventFormService.logValidationErrors(this.eventForm);

    this.formErrors = this.eventFormService.formErrors;

    console.log(this.formErrors);
  }

  getEventAndPopulateForm(eventId: number): any {
    this.startLoading();
    this.eventService.getEvent(eventId).subscribe((response) => {
      if (response.success) {
        this.event = response.data;
        this.schedules = response.data.schedules;

        this.setFormValue(this.event);
        this.eventFormService.markDirty(this.eventForm);
        this.eventForm.updateValueAndValidity();

        this.endLoading();
      }
    })
  }

  setFormValue(event: Event): any {
    this.eventForm.patchValue({
      name: event.name,
      shortDescription: event.shortDescription,
      description: event.description,
      topicId: event.eventTopic ? event.eventTopic.id : null,
      dateGroup: {
        startTime: this.datePipeService.fromUnixTimeStamp(event.startTime),
        endTime: this.datePipeService.fromUnixTimeStamp(event.endTime),
      },
      location: event.location,
      expectedQuantity: event.expectedQuantity,
      fee: event.fee,
      currencyId: event.currency ? event.currency.id : null
    })
  }


  getSubmitModel() {
    const formValue = Object.assign({}, this.eventForm.value);

    return new EventModel(
      this.event ? this.event.id : null,
      formValue.name,
      formValue.shortDescription,
      formValue.description,
      formValue.location,
      this.datePipeService.toUnixTimestamp(formValue.dateGroup.startTime),
      this.datePipeService.toUnixTimestamp(formValue.dateGroup.endTime),
      null,
      formValue.topicId,
      formValue.expectedQuantity,
      formValue.fee,
      formValue.currencyId,
      this.schedules
    );
  }

  startLoading() {
    this.loadingService.register('loading');
  }

  endLoading() {
    this.loadingService.resolve('loading');
  }

  onSelectImage(file: File) {
    this.file = file;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.thumbnailImage = event.target.result;
    }
  }

  onClearImage() {
    this.file = null;
    this.thumbnailImage = this.event ? this.event.image : '';
  }

  onStartTimeChange(date: Date) {
    this.minDate = date;
  }

  onEndTimeChange(date: Date) {
    this.maxDate = date;
  }

  onSubmit() {
    this.submitting = true;
    this.startLoading();

    if (this.eventForm.valid) {
      const event = this.getSubmitModel();

      if (this.isEdit) {
        if (this.file) {
          this.uploadService.uploadFile(this.file).pipe(
            map(params => params['fileDownloadUri']),
            switchMap(fileUrl => {
              event.image = fileUrl
              return this.eventService.updateEvent(event.id, event)
            })
          ).subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          );
        }
        else {
          this.eventService.updateEvent(event.id, event).subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          );
        }

      } else {
        if (this.file) {
          this.uploadService.uploadFile(this.file).pipe(
            map(params => params['fileDownloadUri']),
            switchMap(fileUrl => {
              event.image = fileUrl
              return this.eventService.createEvent(event)
            })
          ).subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          );
        } else {
          this.eventService.createEvent(event)
            .subscribe(
              response => this.handleSubmitSuccess(response),
              error => this.handleSubmitError(error)
            );
        }

      }
    }
  }

  handleSubmitSuccess(response) {
    this.submitting = false;
    this.endLoading();

    const message = this.isEdit ? "Cập nhật sự kiện thành công" : "Thêm sự kiện thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });

    this.router.navigate(['/events']);
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
