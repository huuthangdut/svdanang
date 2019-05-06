import { DepartmentFormService } from './../../../core/services/forms/department-form.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Department } from '../../../core/models/department.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core';
import { DepartmentService } from '../../../core/services/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

  title: string = 'Tạo mới chủ đề';

  departmentId: number;
  department: Department;
  isEdit: boolean = false;

  departmentForm: FormGroup;

  formErrors: any;

  submitting: boolean;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<DepartmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private departmentFormService: DepartmentFormService,
    private loadingService: TdLoadingService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    if (this.data && this.data.departmentId) {
      this.departmentId = this.data.departmentId;
      this.isEdit = true;
      this.title = 'Chỉnh sửa ban'
    }

    this.buildForm();
  }



  buildForm() {
    this.departmentForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: null
    });

    if (this.isEdit) {
      this.getDepartmentAndPopularForm(this.departmentId);
    }

    this.departmentForm.valueChanges.subscribe(data => this.onValueChanged());
    this.onValueChanged();
  }

  onValueChanged(): void {
    if (!this.departmentForm) { return; }

    this.departmentFormService.logValidationErrors(this.departmentForm);
    this.formErrors = this.departmentFormService.formErrors;
  }

  getDepartmentAndPopularForm(id: number) {
    this.startLoading();

    this.departmentService.getDepartment(id).subscribe(response => {
      if (response.success) {
        this.department = response.data;
        this.setFormValue(this.department);
        this.departmentFormService.markDirty(this.departmentForm);
        this.departmentForm.updateValueAndValidity();
        this.endLoading();
      }
    });
  }
  setFormValue(department: Department) {
    this.departmentForm.patchValue({
      name: department.name,
      description: department.description
    })
  }

  startLoading() {
    this.loadingService.register('loading');
  }

  endLoading() {
    this.loadingService.resolve('loading');
  }

  getSubmitModel(): Department {
    const formValue = Object.assign({}, this.departmentForm.value);

    return {
      id: this.department ? this.department.id : null,
      name: formValue.name,
      description: formValue.description
    };
  }

  onSubmit() {
    this.submitting = true;
    this.startLoading();

    if (this.departmentForm.invalid) {
      return;
    }

    const department = this.getSubmitModel();

    if (this.isEdit) {
      this.departmentService.updateDepartment(department.id, department).subscribe(
        response => this.handleSubmitSuccess(response),
        error => this.handleSubmitError(error)
      );
    } else {
      this.departmentService.createDepartment(department).subscribe(
        response => this.handleSubmitSuccess(response),
        error => this.handleSubmitError(error)
      );
    }

  }

  handleSubmitSuccess(response) {
    this.submitting = false;
    this.endLoading();
    const message = this.isEdit ? "Cập nhật ban thành công" : "Thêm ban thành công";

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
