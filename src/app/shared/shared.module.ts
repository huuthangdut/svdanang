import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatGridListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentSearchModule } from '@covalent/core/search';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [],
  imports: [
    // angular modules
    CommonModule,
    RouterModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // material modules
    MatSnackBarModule,
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
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentCommonModule,
    // external modules
    NgxChartsModule,
    // routes
  ],
  exports: [
    // angular modules
    CommonModule,
    RouterModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // material modules
    MatSnackBarModule,
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
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentCommonModule,
    // external modules
    NgxChartsModule,
    // routes
  ]
})
export class SharedModule { }
