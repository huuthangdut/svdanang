import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './main.component';
import { SharedModule } from './shared/shared.module';
import { MatProgressButtonsModule } from 'mat-progress-buttons';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MatProgressButtonsModule.forRoot()

  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    AuthGuard

  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
