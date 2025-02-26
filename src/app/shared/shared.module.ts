import { MAT_MOMENT_DATE_FORMATS } from './settings/date-format.settings';
import { DateTimeFormatPipe } from './pipes/datetime-format.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatProgressBarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
  MatDatepickerModule,
  MatMomentDateModule,
} from '@coachcare/datepicker';
import {
  CovalentBreadcrumbsModule,
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentDialogsModule,
  CovalentExpansionPanelModule,
  CovalentFileModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentMenuModule,
  CovalentMessageModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
  CovalentVirtualScrollModule,
} from '@covalent/core';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatProgressButtonsModule } from 'mat-progress-buttons';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { DateTimeAgoPipe } from './pipes/datetime-ago.pipe';


@NgModule({
  declarations: [
    HasPermissionDirective,
    SpinnerOverlayComponent,
    SpinnerComponent,
    ConfirmDialogComponent,
    DateFormatPipe,
    DateTimeFormatPipe,
    DateTimeAgoPipe,
    UploadImageComponent

  ],
  imports: [
    // angular modules
    CommonModule,
    RouterModule,
    // BrowserModule,
    // BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    // material modules
    MatNativeDateModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatExpansionModule,
    // covalent modules
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentTextEditorModule,
    CovalentBreadcrumbsModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentFileModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    CovalentVirtualScrollModule,
    // external modules
    NgxChartsModule,

    MatProgressButtonsModule,

    MatDatepickerModule,
    MatMomentDateModule,

  ],
  exports: [
    //component
    SpinnerOverlayComponent,
    SpinnerComponent,
    // angular modules
    CommonModule,
    RouterModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    // material modules
    MatProgressBarModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatExpansionModule,
    // covalent modules
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentTextEditorModule,
    CovalentBreadcrumbsModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentFileModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    // external modules
    NgxChartsModule,
    CovalentVirtualScrollModule,

    MatProgressButtonsModule,

    MatDatepickerModule,
    MatMomentDateModule,


    HasPermissionDirective,
    DateFormatPipe,
    DateTimeFormatPipe,
    DateTimeAgoPipe,
    UploadImageComponent

  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    }
  ]
})
export class SharedModule { }
