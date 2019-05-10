import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core/loading';

import { User, UserModel } from '../../../core/models';
import { UserFormService } from '../../../core/services/forms/user-form.service';
import { RoleService } from '../../../core/services/role.service';
import { DepartmentService } from './../../../core/services/department.service';
import { UserService } from './../../../core/services/user.service';
import { PasswordValidators, UserEmailValidators, UsernameValidators } from './../../../core/validators';
import { CrossFieldErrorMatcher } from './../../../core/validators/cross-field-error-matcher';

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

  errorMatcher = new CrossFieldErrorMatcher();


  user: User;
  isEdit: boolean = false;

  // FormBuilder form
  userForm: FormGroup;
  passwordGroup: AbstractControl;

  // Form validation and disabled logic
  formErrors: any;

  // Form submission
  error: boolean;
  submitting: boolean;

  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private roleService: RoleService,
    private userService: UserService,
    private userFormService: UserFormService,
    private loadingService: TdLoadingService,
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
    this.departmentService.getAll().subscribe(response => {
      if (response.success) {
        this.departments = response.data;
      }
    });
  }

  loadRoles() {
    this.roleService.getRoles('', '', '', 0, 30).subscribe(response => {
      if (response.success) {
        this.roles = response.data.content;
      }
    });
  }

  getUserAndPopulateForm(id: number) {
    this.startLoading();
    this.userService.getUser(id).subscribe((response) => {
      if (response.success) {
        this.user = response.data;

        this.userForm.controls['userName'].setAsyncValidators(UsernameValidators.unique(this.userService, this.user.userName));

        this.userForm.controls['email'].setAsyncValidators(UserEmailValidators.unique(this.userService, this.user.email));

        this.setFormValue(this.user);
        this.userFormService.markDirty(this.userForm);

        this.userForm.updateValueAndValidity();

        this.endLoading();
      }
    });
  }

  setFormValue(user: User) {
    this.userForm.patchValue({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      departmentId: user.department ? user.department.id : null,
      isActive: user.isActive,
      roles: user.roles.map(i => i.id)
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
  }

  getSubmitModel() {
    const formValue = Object.assign({}, this.userForm.value);

    return new UserModel(
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

  startLoading() {
    this.loadingService.register('loading');
  }

  endLoading() {
    this.loadingService.resolve('loading');
  }

  onSubmit() {
    this.submitting = true;
    this.startLoading();

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
    this.endLoading();
    const message = this.isEdit ? "Cập nhật người dùng thành công" : "Thêm người dùng thành công";

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