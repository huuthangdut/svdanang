import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { throwIfAlreadyLoaded } from './guards';
import { ErrorHandlerInterceptor, HttpTokenInterceptor } from './interceptors';

@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent,
    SidenavComponent,

  ],
  imports: [
    // CommonModule,
    // HttpClientModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    FooterComponent,
    SidenavComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
