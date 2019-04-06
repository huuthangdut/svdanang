import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { UserModel, FormUserModel } from '../../../core/models';
import { UserFormService } from '../../../core/services/forms/user-form.service';
import { UserService } from './../../../core/services/user.service';
import { PasswordValidators, UserEmailValidators, UsernameValidators } from './../../../core/validators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  title = 'Tạo mới người dùng';
  departments = [];
  roles = [];
  hidePassword = true;


  user: UserModel;
  isEdit: boolean = false;

  // FormBuilder form
  userForm: FormGroup;
  passwordGroup: AbstractControl;

  // Form validation and disabled logic
  formErrors: any;

  // Form submission
  submitUserObj: UserModel;
  error: boolean;
  submitting: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userFormService: UserFormService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    if (this.data && this.data.userId) {
      this.isEdit = true;
      this.title = "Chỉnh sửa người dùng";
    }


    this.formErrors = this.userFormService.formErrors;
    this.loadDepartments();
    this.loadRoles();

    // Use FormBuilder to construct the form
    this.buildForm();
  }

  loadDepartments() {
    this.departments = [
      { id: 1, name: 'Ban 1' },
      { id: 2, name: 'Ban 2' },
      { id: 3, name: 'Ban 3' },
      { id: 4, name: 'Ban 4' },
    ]
  }

  loadRoles() {
    this.roles = [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Admod' },
      { id: 3, name: 'Admoedd' },
    ]
  }

  getUserAndPopulateForm(id: number) {
    this.userService.getUser(id).subscribe((response) => {
      this.user = response.data;

      this.userForm.controls['userName'].setAsyncValidators(UsernameValidators.unique(this.userService, this.user.userName));

      this.userForm.controls['email'].setAsyncValidators(UserEmailValidators.unique(this.userService, this.user.email));

      this.setFormValue(this.user);
      this.userFormService.markDirty(this.userForm);

      this.userForm.updateValueAndValidity();

    });
  }

  setFormValue(user: UserModel) {
    this.userForm.patchValue({
      id: user.id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      departmentId: user.department ? user.department.id : null,
      isActive: true,
      roles: [1, 2]
    });
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      firstName: [
        null,
        Validators.required],
      lastName: [
        null,
        Validators.required],
      userName: [
        null,
        [Validators.required],
        [UsernameValidators.unique(this.userService)]],
      email:
        [null,
          [Validators.required, Validators.email],
          [UserEmailValidators.unique(this.userService)]
        ],
      departmentId: null,
      isActive: false,
      roles: [null, [Validators.required]]
    })

    if (!this.isEdit) {
      this.passwordGroup = this.formBuilder.group({
        password:
          ['', Validators.required],
        confirmPassword:
          ['', Validators.required]
      }, { validators: PasswordValidators.matchPassword });

      this.userForm.addControl('passwordGroup', this.passwordGroup);
      this.userForm.updateValueAndValidity();
    }
    else {
      this.getUserAndPopulateForm(this.data.userId);
    }

    // Subscribe to form value changes
    this.userForm
      .valueChanges
      .subscribe(data => this.onValueChanged());

    this.onValueChanged();
  }

  onValueChanged(): void {
    if (!this.userForm) { return; }

    this.userFormService.logValidationErrors(this.userForm);

    this.formErrors = this.userFormService.formErrors;

    console.log(this.formErrors);
  }

  getSubmitModel() {
    const formValue = Object.assign({}, this.userForm.value);

    return new FormUserModel(
      this.user ? this.user.id : null,
      formValue.userName,
      formValue.lastName,
      formValue.firstName,
      this.user ? this.user.avatar : null,
      formValue.email,
      formValue.passwordGroup ? formValue.passwordGroup.password : null,
      formValue.departmentId,
      formValue.roles,
      formValue.isActive
    )
  }

  onSubmit() {
    this.submitting = true;

    if (this.userForm.valid) {

      const user = this.getSubmitModel();

      if (this.isEdit) {
        this.userService.updateUser(user.id, user).subscribe(
          response => this.handleSubmitSuccess(response),
          error => this.handleSubmitError(error)
        );
      } else {
        this.userService.createUser(user)
          .subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          );
      }
    }
  }

  handleSubmitSuccess(response) {
    this.submitting = false;
    const message = this.isEdit ? "Cập nhật người dùng thành công" : "Thêm người dùng thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });

    this.dialogRef.close(true);
  }

  handleSubmitError(error) {
    this.submitting = false;
    console.log(error);

    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.", '', {
      duration: 2000,
    });
  }
}