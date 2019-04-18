import { FormGroup, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventScheduleFormService {

  validationMessages: any;

  formErrors = {
    startTime: '',
    endTime: '',
    schedule: '',
    location: ''
  }

  constructor() {
    this.validationMessages = {
      startTime: {
        required: 'Vui lòng nhập thời gian bắt đầu.'
      },
      endTime: {
        required: 'Vui lòng nhập thời gian kết thúc.'
      },
      schedule: {
        required: 'Vui lòng nhập nội dung.'
      },
      location: {
        required: 'Vui lòng nhập địa điểm.'
      }
    }
  }

  logValidationErrors(group: FormGroup) {
    Object.keys(group.controls).forEach((field: string) => {
      if (this.formErrors.hasOwnProperty(field)) {
        const abstractControl = group.get(field);

        this.formErrors[field] = '';
        this.setErrorMessages(abstractControl, this.formErrors, field);

        if (abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl);
        }
      }
    })
  }

  setErrorMessages(control: AbstractControl, errorsObj: any, field: string) {
    if (control && control.invalid && (control.touched || control.dirty)) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorsObj[field] += messages[key] + ' ';
        }
      }
    }
  }

  markDirty(group: FormGroup): any {
    for (const i in group.controls) {
      if (group.controls.hasOwnProperty(i)) {
        group.controls[i].markAsDirty();
      }
    }
  }
}
