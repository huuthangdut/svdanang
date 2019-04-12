import { ActionService } from './../../../core/services/action.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, Injectable, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTreeFlatDataSource, MatTreeFlattener, MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

import { Role, RoleModel } from '../../../core/models';
import { RoleService } from './../../../core/services/role.service';
import { RoleFormService } from '../../../core/services/forms/role-form.service';

export class PermissionNode {
  id: number;
  name: string;
  displayName: string;
  children?: PermissionNode[];
}

export class PermissionFlatNode {
  id: number;
  name: string;
  displayName: string;
  level: number;
  expandable: boolean;
}

export const PERMISSIONS = [
  {
    id: 2,
    name: "Pages.Administration.AuditLogs",
    displayName: "Audit logs",
    parentId: 1
  },
  {
    id: 3,
    name: "Pages.Administration.Users",
    displayName: "User",
    parentId: 1
  },
  {
    id: 4,
    name: "Pages.Administration.Users.Delete",
    displayName: "Deleting user",
    parentId: 3
  },
  {
    id: 5,
    name: "Pages.Administration.Users.Edit",
    displayName: "Editing user",
    parentId: 3
  },
  {
    id: 1,
    name: "Pages.Administration",
    displayName: "Administration",
    parentId: null,
  },
  {
    id: 6,
    name: "Pages.Administration.Users.Create",
    displayName: "Creating user",
    parentId: 3
  },
  {
    id: 7,
    name: "Pages.Administration.Users.Read",
    displayName: "View user",
    parentId: 3
  }
]
export const GRANTED_PERMISSIONS = [
  "Pages",
  "Pages.DemoUiComponents",
  "Pages.Administration",
  "Pages.Administration.Roles",
  "Pages.Administration.Roles.Create",
  // "Pages.Administration.Roles.Edit",
  "Pages.Administration.Roles.Delete",
  "Pages.Administration.Users",
  // "Pages.Administration.Users.Create",
  "Pages.Administration.Users.Edit",
  "Pages.Administration.Users.Delete",
  "Pages.Administration.Users.ChangePermissions",
  "Pages.Administration.Users.Impersonation",
  // "Pages.Administration.Languages",
  "Pages.Administration.Languages.Create",
  "Pages.Administration.Languages.Edit",
  "Pages.Administration.Languages.Delete",
  "Pages.Administration.Languages.ChangeTexts",
  "Pages.Administration.AuditLogs",
  "Pages.Administration.OrganizationUnits",
  "Pages.Administration.OrganizationUnits.ManageOrganizationTree",
  "Pages.Administration.OrganizationUnits.ManageMembers",
  "Pages.Administration.OrganizationUnits.ManageRoles",
  "Pages.Administration.UiCustomization",
  "Pages.Administration.Tenant.Settings",
  "Pages.Administration.Tenant.SubscriptionManagement",
  "Pages.Tenant.Dashboard"
]


@Injectable({
  providedIn: 'root'
})
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<PermissionNode[]>([]);

  get data(): PermissionNode[] { return this.dataChange.value; }

  constructor(private actionService: ActionService) {
    this.initialize();
  }

  initialize() {
    this.actionService.getAll().subscribe((response: any) => {
      if (response.success) {
        // Build the tree nodes from Json object.
        const data = this.buildFileTree(response.data);

        // Notify the change.
        this.dataChange.next(data);
      }
    });
  }

  buildFileTree(list): PermissionNode[] {
    let map = {};
    let node, roots = [];

    for (let i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      console.log("set map " + list[i].id + " = " + i);
      // list[i].children = []; // initialize the children
    }
    for (let i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId != null) {
        // if you have dangling branches check that map[node.parentId] exists
        if (!list[map[node.parentId]].children) {
          list[map[node.parentId]].children = [];
        }
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }


}


@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<PermissionFlatNode, PermissionNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<PermissionNode, PermissionFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: PermissionFlatNode | null = null;

  treeControl: FlatTreeControl<PermissionFlatNode>;

  treeFlattener: MatTreeFlattener<PermissionNode, PermissionFlatNode>;

  dataSource: MatTreeFlatDataSource<PermissionNode, PermissionFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<PermissionFlatNode>(true /* multiple */);

  roleForm: FormGroup;
  title = 'Tạo mới vai trò';
  isEdit = false;

  role: Role;
  grantedActionNames = [];
  formErrors: any;
  submitting = false;


  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private roleFormService: RoleFormService,
    private snackBar: MatSnackBar,
    private database: ChecklistDatabase) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<PermissionFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      console.log("get data tree")
      this.dataSource.data = data;
      this.treeControl.expandAll();
    });
  }

  ngOnInit() {
    if (this.data && this.data.roleId) {
      this.isEdit = true;
      this.title = 'Chỉnh sửa vai trò';
    }

    this.formErrors = this.roleFormService.formErrors;

    this.buildForm();
  }

  checkGrantedActions() {
    console.log("check granted");
    for (let node of this.treeControl.dataNodes) {
      if (this.grantedActionNames.includes(node.name)) {
        this.checklistSelection.select(node);
      }
    }
  }


  buildForm() {
    this.roleForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: null
    });

    if (this.isEdit) {
      this.getRoleAndPopulateForm(this.data.roleId);
    }

    this.roleForm.valueChanges.subscribe(data => this.onValueChanged());
  }

  onValueChanged() {
    if (!this.roleForm) { return; }

    this.roleFormService.logValidationErrors(this.roleForm);

    this.formErrors = this.roleFormService.formErrors;

    console.log(this.formErrors);
  }

  getRoleAndPopulateForm(id: any) {
    this.roleService.getRole(id).subscribe((response) => {
      this.role = response.data.role;
      this.grantedActionNames = response.data.grantedActionNames;

      this.setFormValue(this.role);
      this.roleFormService.markDirty(this.roleForm);

      this.checkGrantedActions();
    });
  }

  setFormValue(role: Role) {
    this.roleForm.patchValue({
      name: role.name,
      description: role.description
    });
  }

  getSubmitModel() {
    const formValue = Object.assign({}, this.roleForm.value);

    return new RoleModel(
      this.role ? this.role.id : null,
      formValue.name,
      formValue.description,
      this.checklistSelection.selected.map(i => i.id)
    );
  }


  getLevel = (node: PermissionFlatNode) => node.level;

  isExpandable = (node: PermissionFlatNode) => node.expandable;

  getChildren = (node: PermissionNode): PermissionNode[] => node.children;

  hasChild = (_: number, _nodeData: PermissionFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: PermissionFlatNode) => _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: PermissionNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : new PermissionFlatNode();
    flatNode.id = node.id;
    flatNode.name = node.name;
    flatNode.displayName = node.displayName;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: PermissionFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: PermissionFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: PermissionFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: PermissionFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: PermissionFlatNode): void {
    let parent: PermissionFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: PermissionFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: PermissionFlatNode): PermissionFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  onSubmit() {
    this.submitting = true;

    if (this.roleForm.valid) {
      const role = this.getSubmitModel();
      console.log(role);

      if (this.isEdit) {
        this.roleService.updateRole(role.id, role).subscribe(
          response => this.handleSubmitSuccess(response),
          error => this.handleSubmitError(error)
        );
      } else {
        this.roleService.createRole(role).subscribe(
          response => this.handleSubmitSuccess(response),
          error => this.handleSubmitError(error)
        )
      }
    }

  }

  handleSubmitSuccess(response) {
    this.submitting = false;
    const message = this.isEdit ? "Cập nhật vai trò thành công" : "Thêm vai trò thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });

    this.dialogRef.close(true);
  }

  handleSubmitError(error) {
    this.submitting = false;
    console.log(error);

    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.", '', {
      duration: 2000,
    });
  }
}


