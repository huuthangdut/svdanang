import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MeetingFormService {

  validationMessages: any;

  formErrors = {
    day: '',
    timeGroup: '',
    startTime: '',
    endTime: '',
    location: '',
    title: '',
    content: ''
  }

  constructor() {
    this.validationMessages = {
      day: {
        required: 'Vui lòng chọn ngày họp.'
      },
      startTime: {
        required: 'Vui lòng chọn thời gian bắt đầu cuộc họp.'
      },
      endTime: {
        required: 'Vui lòng chọn thời gian kết thúc cuộc họp.'
      },
      timeGroup: {
        dateRange: 'Khoảng thời gian không hợp lệ.'
      },
      location: {
        required: 'Vui lòng nhập địa điểm họp.'
      },
      title: {
        required: 'Vui lòng nhập tiêu đề cuộc họp.'
      },
      content: {
        required: 'Vui lòng nhập nội dung cuộc họp.'
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
