import { TdLoadingService } from '@covalent/core/loading';
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

@Injectable({
  providedIn: 'root'
})
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<PermissionNode[]>([]);

  get data(): PermissionNode[] { return this.dataChange.value; }

  constructor(
    private actionService: ActionService) {
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
    }
    for (let i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId != null) {
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
  loading: boolean;


  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private roleFormService: RoleFormService,
    private snackBar: MatSnackBar,
    private loadingService: TdLoadingService,
    private database: ChecklistDatabase) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<PermissionFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
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
    this.startLoading();
    this.roleService.getRole(id).subscribe((response) => {
      this.role = response.data.role;
      this.grantedActionNames = response.data.grantedActionNames;

      this.setFormValue(this.role);
      this.roleFormService.markDirty(this.roleForm);

      this.checkGrantedActions();

      this.endLoading();
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

    console.log(this.checklistSelection.selected.map(i => i.name))

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

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: PermissionFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const partialDesSelected = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );

    const desAllDeselected = descendants.every(child => !this.checklistSelection.isSelected(child));

    if (this.checklistSelection.isSelected(node) && desAllDeselected) {
      return true;
    }

    return partialDesSelected;
  }

  /** Toggle the item selection. Select/deselect all the descendants node */
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

  /** Toggle a leaf item selection. Check all the parents to see if they changed */
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

    // edited
    if (!nodeSelected && descAllSelected) {
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

  startLoading() {
    this.loadingService.register('loading');
  }

  endLoading() {
    this.loadingService.resolve('loading');
  }

  onSubmit() {
    this.submitting = true;
    this.startLoading();

    if (this.roleForm.valid) {
      const role = this.getSubmitModel();

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
    this.endLoading();
    const message = this.isEdit ? "Cập nhật vai trò thành công" : "Thêm vai trò thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });

    this.dialogRef.close(true);
  }

  handleSubmitError(error) {
    this.submitting = false;
    this.endLoading();
    console.log(error);

    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.", '', {
      duration: 2000,
    });
  }
}


