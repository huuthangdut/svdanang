import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main.component';
import { SharedModule } from './shared/shared.module';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';

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
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
