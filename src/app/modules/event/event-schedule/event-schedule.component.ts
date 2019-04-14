import { EventSchedule } from './../../../core/models/event-schedule.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-event-schedule',
  templateUrl: './event-schedule.component.html',
  styleUrls: ['./event-schedule.component.scss']
})
export class EventScheduleComponent implements OnInit {
  @Input() schedules: EventSchedule[] = [];
  @Output() changeSchedules: EventEmitter = new EventEmitter();

  scheduleForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.scheduleForm = this.formBuilder.group({
      startTime: new Date(),
      endTime: new Date(),
      schedule: null,
      location: null
    });

  }

  onAddSchedule() {
    this.schedules.push(this.scheduleForm.value);
    this.changeSchedules.emit(this.schedules);
  }

  onRemoveSchedule(index) {
    this.schedules.splice(index, 1);
    this.changeSchedules.emit(this.schedules);
  }

}
