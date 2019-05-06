import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthUser } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {
  private currentUser: AuthUser;
  private permissions = [];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.updateView();
    });
  }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();

    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission() {
    if (this.currentUser && this.currentUser.grantedActions) {
      return this.permissions.every(current => this.currentUser.grantedActions.includes(current));
    }

    return true;
  }
}
