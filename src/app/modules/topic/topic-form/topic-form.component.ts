import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core/loading';

import { Topic } from './../../../core/models/topic.model';
import { TopicFormService } from './../../../core/services/forms/topic-form.service';
import { TopicService } from './../../../core/services/topic.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss']
})
export class TopicFormComponent implements OnInit {
  title: string = 'Tạo mới chủ đề';

  topicId: number;
  topic: Topic;
  isEdit: boolean = false;

  topicForm: FormGroup;

  formErrors: any;

  submitting: boolean;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<TopicFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private topicService: TopicService,
    private topicFormService: TopicFormService,
    private loadingService: TdLoadingService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    if (this.data) {
      if (this.data.type) {
        this.topicService.setType(this.data.type);
      }

      if (this.data.topicId) {
        this.topicId = this.data.topicId;
        this.isEdit = true;
        this.title = 'Chỉnh sửa chủ đề'
      }
    }

    this.buildForm();
  }



  buildForm() {
    this.topicForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: null
    });

    if (this.isEdit) {
      this.getTopicAndPopularForm(this.topicId);
    }

    this.topicForm.valueChanges.subscribe(data => this.onValueChanged());
    this.onValueChanged();
  }

  onValueChanged(): void {
    if (!this.topicForm) { return; }

    this.topicFormService.logValidationErrors(this.topicForm);
    this.formErrors = this.topicFormService.formErrors;
  }

  getTopicAndPopularForm(id: number) {
    this.startLoading();

    this.topicService.getTopic(id).subscribe(response => {
      if (response.success) {
        this.topic = response.data;
        this.setFormValue(this.topic);
        this.topicFormService.markDirty(this.topicForm);
        this.topicForm.updateValueAndValidity();
        this.endLoading();
      }
    });
  }
  setFormValue(topic: Topic) {
    this.topicForm.patchValue({
      name: topic.name,
      description: topic.description
    })
  }

  startLoading() {
    this.loadingService.register('loading');
  }

  endLoading() {
    this.loadingService.resolve('loading');
  }

  getSubmitModel(): Topic {
    const formValue = Object.assign({}, this.topicForm.value);

    return {
      id: this.topic ? this.topic.id : null,
      name: formValue.name,
      description: formValue.description
    };
  }

  onSubmit() {
    this.submitting = true;
    this.startLoading();

    if (this.topicForm.invalid) {
      return;
    }

    const topic = this.getSubmitModel();

    if (this.isEdit) {
      this.topicService.updateTopic(topic.id, topic).subscribe(
        response => this.handleSubmitSuccess(response),
        error => this.handleSubmitError(error)
      );
    } else {
      this.topicService.createTopic(topic).subscribe(
        response => this.handleSubmitSuccess(response),
        error => this.handleSubmitError(error)
      );
    }

  }

  handleSubmitSuccess(response) {
    this.submitting = false;
    this.endLoading();
    const message = this.isEdit ? "Cập nhật chủ đề thành công" : "Thêm chủ đề thành công";

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