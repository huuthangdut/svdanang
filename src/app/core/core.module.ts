import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { ErrorInterceptor, JwtInterceptor } from './interceptors';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent,
    SidenavComponent,
    MenuListItemComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent

  ],
  imports: [
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
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }

  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}


