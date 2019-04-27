import { ProjectService } from './../../../core/services/project.service';
import { Donation, DonationModel } from './../../../core/models/donation.model';
import { CurrencyService } from './../../../core/services/currency.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss']
})
export class DonationFormComponent implements OnInit {
  title = 'Thêm thông tin ủng hộ'

  currencies: [] = [];

  donation: Donation;
  projectId: number;
  isEdit: boolean = false;


  donationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DonationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private currencyService: CurrencyService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    if (this.data) {
      if (this.data.donationId) {
        this.title = 'Chỉnh sửa thông tin ủng hộ';
        this.isEdit = true;
      }
      if (this.data.projectId) {
        this.projectId = this.data.projectId;
      }
    }


    this.loadCurrencies();
    this.buildForm();

  }


  loadCurrencies() {
    this.currencyService.getAll().subscribe(response => {
      if (response.success) {
        this.currencies = response.data;
      }
    });
  }

  buildForm() {
    this.donationForm = this.formBuilder.group({
      amount: [null, Validators.required],
      note: [null],
      currencyId: [null, Validators.required]
    });

    if (this.isEdit) {
      this.getDonationAndPopulateForm(this.data.donationId);
    }
  }

  getDonationAndPopulateForm(id: any) {
    this.projectService.getDonation(id).subscribe(response => {
      if (response.success) {
        this.donation = response.data;

        this.setFormValue(this.donation);
      }
    });
  }

  setFormValue(donation: Donation) {
    this.donationForm.patchValue({
      amount: donation.amount,
      note: donation.note,
      currencyId: donation.currency ? donation.currency.id : null,
    });
  }

  getSubmitModel() {
    const formValue = Object.assign({}, this.donationForm.value);

    return new DonationModel(
      this.donation ? this.donation.id : null,
      this.projectId,
      formValue.amount,
      formValue.note,
      formValue.currencyId
    );
  }

  onSubmit() {
    if (this.donationForm.valid) {
      const donation = this.getSubmitModel();

      if (this.isEdit) {
        this.projectService.updateDonation(donation.id, donation)
          .subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          )
      } else {
        this.projectService.createDonation(donation)
          .subscribe(
            response => this.handleSubmitSuccess(response),
            error => this.handleSubmitError(error)
          )
      }
    }
  }

  handleSubmitSuccess(response) {
    const message = this.isEdit ? "Cập nhật thông tin ủng hộ thành công" : "Thêm thông tin ủng hộ thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });

    this.dialogRef.close(true);
  }

  handleSubmitError(error) {
    console.log(error);

    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.", '', {
      duration: 2000,
    });
  }


}
