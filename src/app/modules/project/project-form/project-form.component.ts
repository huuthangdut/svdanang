import { CurrencyService } from './../../../core/services/currency.service';
import { UploadService } from './../../../core/services/upload.service';
import { MatSnackBar } from '@angular/material';
import { TdLoadingService } from '@covalent/core/loading';
import { DatePipeService } from './../../../shared/services/date-pipe.service';
import { ProjectTopicService } from './../../../core/services/project-topic.service';
import { ProjectFormService } from './../../../core/services/forms/project-form.service';
import { ProjectService } from './../../../core/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrossFieldErrorMatcher } from './../../../core/validators/cross-field-error-matcher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Project, ProjectModel } from '../../../core/models/project.model';
import { DateValidators } from '../../../core/validators/date.validator';
import { switchMap, map } from 'rxjs/operators';
import { TINY_MCE_SETTINGS } from '../../../shared/settings/editor.setting';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  file: File;
  thumbnailImage: string;

  title = 'Tạo mới dự án';
  topics = [];
  currencies = [];

  projectId: number;
  project: Project;
  isEdit: boolean = false;

  projectForm: FormGroup;

  formErrors: any;
  errorMatcher = new CrossFieldErrorMatcher();

  submitting: boolean;
  loading: boolean;

  tinyMCE = TINY_MCE_SETTINGS;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private projectFormService: ProjectFormService,
    private projectTopicService: ProjectTopicService,
    private currencyService: CurrencyService,
    private datePipeService: DatePipeService,
    private loadingService: TdLoadingService,
    private uploadService: UploadService,
    private snackBar: MatSnackBar

  ) {
    let param = +this.route.snapshot.paramMap.get('id');
    param = !isNaN(param) ? param : null;
    if (param) {
      this.projectId = param;
      this.isEdit = true;
      this.title = 'Chỉnh sửa dự án';
    }
  }

  ngOnInit() {
    this.formErrors = this.projectFormService.formErrors;

    this.loadProjectTopics();
    this.loadCurrencies();
    this.buildForm();
  }

  loadCurrencies() {
    this.currencyService.getAll().subscribe(response => {
      if (response.success) {
        this.currencies = response.data;
      }
    })
  }


  loadProjectTopics(): any {
    this.projectTopicService.getAll().subscribe(response => {
      if (response.success) {
        this.topics = response.data;
      }
    })
  }

  buildForm(): any {
    this.projectForm = this.formBuilder.group({
      name: [null, Validators.required],
      shortDescription: null,
      description: null,
      projectTopicId: [null, Validators.required],
      dateGroup: this.formBuilder.group({
        startTime: [null, [Validators.required]],
        endTime: [null, [Validators.required]],
      }, { validators: DateValidators.dateRange }),
      goal: [null, Validators.required],
      currencyId: [null, Validators.required]
    });

    if (this.isEdit) {
      this.getProjectAndPopulateForm(this.projectId);
    }

    this.projectForm.valueChanges.subscribe(data => this.onValueChanged());
    this.onValueChanged();
  }


  getProjectAndPopulateForm(projectId: number): any {
    this.startLoading();
    this.projectService.getProject(projectId).subscribe(response => {
      if (response.success) {
        this.project = response.data;

        this.setFormValue(this.project);
        this.projectFormService.markDirty(this.projectForm);
        this.projectForm.updateValueAndValidity();

        this.endLoading();
      }
    });
  }

  setFormValue(project: Project): any {
    this.projectForm.patchValue({
      name: project.name,
      shortDescription: project.shortDescription,
      description: project.description,
      projectTopicId: project.projectTopic ? project.projectTopic.id : null,
      dateGroup: {
        startTime: this.datePipeService.fromUnixTimeStamp(project.startTime),
        endTime: this.datePipeService.fromUnixTimeStamp(project.endTime),
      },
      goal: project.goal,
      currencyId: project.currency ? project.currency.id : null
    })

    this.thumbnailImage = project.image;
  }

  onValueChanged(): void {
    if (!this.projectForm) { return; }

    this.projectFormService.logValidationErrors(this.projectForm);
    this.formErrors = this.projectFormService.formErrors;
  }

  startLoading() {
    this.loadingService.register('loading');
  }

  endLoading() {
    this.loadingService.resolve('loading');
  }

  getSubmitModel(): ProjectModel {
    const formValue = Object.assign({}, this.projectForm.value);

    return new ProjectModel(
      this.project ? this.project.id : null,
      formValue.name,
      formValue.shortDescription,
      formValue.description,
      this.datePipeService.toUnixTimestamp(formValue.dateGroup.startTime),
      this.datePipeService.toUnixTimestamp(formValue.dateGroup.endTime),
      formValue.goal,
      this.project ? this.project.image : null,
      formValue.projectTopicId,
      formValue.currencyId
    )
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
    this.thumbnailImage = this.project ? this.project.image : '';
  }

  onSubmit() {
    this.submitting = true;
    this.startLoading();

    if (this.projectForm.valid) {
      const project = this.getSubmitModel();

      console.log(project);

      if (this.isEdit) {
        if (this.file) {
          this.uploadService.uploadFile(this.file).pipe(
            map(params => params['fileDownloadUri']),
            switchMap(fileUrl => {
              project.image = fileUrl
              return this.projectService.updateProject(project.id, project)
            })
          ).subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          );
        }
        else {
          this.projectService.updateProject(project.id, project).subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          );
        }

      } else {
        if (this.file) {
          this.uploadService.uploadFile(this.file).pipe(
            map(params => params['fileDownloadUri']),
            switchMap(fileUrl => {
              project.image = fileUrl
              return this.projectService.createProject(project)
            })
          ).subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          );
        } else {
          this.projectService.createProject(project)
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

    const message = this.isEdit ? "Cập nhật dự án thành công" : "Thêm dự án thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });

    this.router.navigate(['/projects']);
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
