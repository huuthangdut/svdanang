import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './../../core/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class ActionDatabase {
  dataChange = new BehaviorSubject<string[]>([]);

  get data(): string[] { return this.dataChange.value; }

  constructor(private userService: UserService) {
    this.initialize();
  }

  initialize() {
    this.userService.getCurrentGrantedActions().subscribe((response: any) => {
      if (response.success) {

        // Notify the change.
        this.dataChange.next(response.data);
      }
    });
  }
}

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {
  private grantedActions: string[] = [];
  private permissions = [];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private database: ActionDatabase
  ) {
    database.dataChange.subscribe(data => {
      this.grantedActions = data;
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
    if (this.grantedActions) {
      return this.permissions.every(current => this.grantedActions.includes(current));
    }

    return true;
  }
}

