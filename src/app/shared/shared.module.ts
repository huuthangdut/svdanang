import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
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
} from '@angular/material';
import { RouterModule } from '@angular/router';
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
} from '@covalent/core';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatProgressButtonsModule } from 'mat-progress-buttons';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HasPermissionDirective } from './directives/has-permission.directive';

@NgModule({
  declarations: [
    HasPermissionDirective,
    SpinnerOverlayComponent,
    SpinnerComponent,
    ConfirmDialogComponent,

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
    MatDatepickerModule,
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

    MatProgressButtonsModule

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
    MatDatepickerModule,
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

    MatProgressButtonsModule,


    HasPermissionDirective,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
