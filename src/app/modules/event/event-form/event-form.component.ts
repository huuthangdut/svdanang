import { MatSnackBar } from '@angular/material';
import { EventFormService } from './../../../core/services/forms/event-form.service';
import { EventService } from './../../../core/services/event.service';
import { EventTopicService } from './../../../core/services/event-topic.service';
import { CurrencyService } from './../../../core/services/currency.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Event, EventModel } from '../../../core/models/event.model';
import { DateValidators } from '../../../core/validators/date.validator';
import { EventSchedule } from '../../../core/models/event-schedule.model';
import { DatePipeService } from '../../../shared/services/date-pipe.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  title = 'Tạo mới sự kiện';
  topics = [];
  currencies = [];
  schedules: EventSchedule[] = [];

  eventId: number;
  event: Event;
  isEdit: boolean = false;

  eventForm: FormGroup;

  formErrors: any;

  submitting: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private eventService: EventService,
    private eventFormService: EventFormService,
    private eventTopicService: EventTopicService,
    private datePipeService: DatePipeService,
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
      description: null,
      topicId: [null, Validators.required],
      startTime: [null, [Validators.required, DateValidators.date]],
      endTime: [null, [Validators.required, DateValidators.date]],
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
    this.eventService.getEvent(eventId).subscribe((response) => {
      if (response.success) {
        this.event = response.data;

        this.setFormValue(this.event);
        this.eventFormService.markDirty(this.eventForm);
        this.eventForm.updateValueAndValidity();
      }
    })
  }

  setFormValue(event: Event): any {
    this.eventForm.patchValue({
      name: event.name,
      description: event.description,
      topicId: event.eventTopic.id,
      startTime: null,
      endTime: null,
      location: event.location,
      expectedQuantity: event.expectedQuantity,
      fee: event.fee,
      currencyId: event.currency.id
    })
  }


  getSubmitModel() {
    const formValue = Object.assign({}, this.eventForm.value);

    return new EventModel(
      this.event ? this.event.id : null,
      formValue.name,
      formValue.description,
      formValue.location,
      this.datePipeService.toUnixTimestamp(formValue.startTime),
      this.datePipeService.toUnixTimestamp(formValue.endTime),
      null,
      formValue.topicId,
      formValue.expectedQuantity,
      formValue.fee,
      formValue.currencyId,
      this.schedules
    );
  }

  onSubmit() {
    this.submitting = true;
    if (this.eventForm.valid) {
      const event = this.getSubmitModel();
      console.log(event);

      if (this.isEdit) {
        this.eventService.updateEvent(event.id, event).subscribe(
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

  handleSubmitSuccess(response) {
    this.submitting = false;
    const message = this.isEdit ? "Cập nhật sự kiện thành công" : "Thêm sự kiện thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  handleSubmitError(error) {
    this.submitting = false;
    console.log(error);

    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.", '', {
      duration: 2000,
    });
  }

}
