import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

export class PermissionNode {
  id: number;
  name: string;
  displayName: string;
  children?: PermissionNode[];
}

/** Flat to-do item node with expandable and level information */
export class PermissionFlatNode {
  id: number;
  name: string;
  displayName: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */

export const PERMISSIONS: PermissionNode[] = [
  {
    id: 1,
    name: 'Pages',
    displayName: 'Pages',
    children: [
      {
        id: 1,
        name: 'Pages.Administration',
        displayName: 'Administration',
        children: [
          {
            id: 1,
            name: 'Pages.Administration.AuditLogs',
            displayName: 'Audit logs',
            children: [
              {
                id: 1,
                name: 'Pages.Administration.OrganizationUnits',
                displayName: 'Organization Units',
                children: [
                  {
                    id: 1,
                    name: 'Pages.Administration.OrganizationUnits.ManageMembers',
                    displayName: 'Managing members',
                  },
                  {
                    id: 1,
                    name: 'Pages.Administration.OrganizationUnits.ManageOrganizationTree',
                    displayName: 'Managing organization tree'
                  },
                  {
                    id: 1,
                    name: 'Pages.Administration.OrganizationUnits.ManageRoles',
                    displayName: 'Managing roles'
                  },
                ]
              },

              {
                id: 1,
                name: 'Pages.Administration.Roles',
                displayName: 'Roles',
                children: [
                  {
                    id: 1,
                    name: 'Pages.Administration.Roles.Create',
                    displayName: 'Creating new role'
                  },
                  {
                    id: 1,
                    name: 'Pages.Administration.Roles.Delete',
                    displayName: 'Deleting role'
                  },
                  {
                    id: 1,
                    name: 'Pages.Administration.Roles.Edit',
                    displayName: 'Editing role'
                  },
                ]
              },
              {
                id: 1,
                name: 'Pages.Administration.Tenant.Settings',
                displayName: 'Settings'
              },
              {
                id: 1,
                name: 'Pages.Administration.Tenant.SubscriptionManagement',
                displayName: 'Subscription'
              },
              {
                id: 1,
                name: 'Pages.Administration.Users',
                displayName: 'Users',
                children: [
                  {
                    id: 1,
                    name: 'Pages.Administration.Users.ChangePermissions',
                    displayName: 'Changing permissions'
                  },
                  {
                    id: 1,
                    name: 'Pages.Administration.Users.Create',
                    displayName: 'Creating new user'
                  },
                  {
                    id: 1,
                    name: 'Pages.Administration.Users.Edit',
                    displayName: 'Administration.Users.Edit'
                  },

                  {
                    id: 1,
                    name: 'Pages.Administration.Users.Impersonation',
                    displayName: 'Login for users'
                  },
                  {
                    id: 1,
                    name: 'Pages.Administration.Users.Delete',
                    displayName: 'Deleting user'
                  },
                ]
              },
              {
                id: 1,
                name: 'Pages.Administration.UiCustomization',
                displayName: 'Visual Settings'
              },
              {
                id: 1,
                name: 'Pages.Administration.Languages',
                displayName: 'Languages',
                children: [
                  {
                    id: 1,
                    name: 'Pages.Administration.Languages.ChangeTexts',
                    displayName: 'Changing texts'
                  },
                  {
                    id: 1,
                    name: 'Pages.Administration.Languages.Create',
                    displayName: 'Creating new language'
                  },
                  {
                    id: 1,
                    name: 'Pages.Administration.Languages.Delete',
                    displayName: 'Deleting language'
                  },

                  {
                    id: 1,
                    name: 'Pages.Administration.Languages.Edit',
                    displayName: 'Editing language'
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 1,
        name: 'Pages.Tenant.Dashboard',
        displayName: 'Dashboard'
      },
      {
        id: 1,
        name: 'Pages.DemoUiComponents',
        displayName: 'Demo UI Components'
      },
    ]
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

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    // const data = this.buildFileTree(PERMISSIONS, 0);
    const data = PERMISSIONS;

    // Notify the change.
    this.dataChange.next(data);
  }


}


@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent {
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

  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);


  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<PermissionFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

    this.treeControl.expandAll();
    for (let node of this.treeControl.dataNodes) {
      if (GRANTED_PERMISSIONS.includes(node.name)) {
        this.checklistSelection.select(node);
      }
    }

  }

  // ngAfterViewInit() {
  //   this.treeControl.expandAll();
  //   for (let node of this.treeControl.dataNodes) {
  //     if (GRANTED_PERMISSIONS.includes(node.item)) {
  //       this.checklistSelection.select(node);
  //     }
  //   }

  // }

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



  // constructor(
  //   public dialogRef: MatDialogRef<RoleFormComponent>,
  //   @Inject(MAT_DIALOG_DATA) private data: any

  // ) { }

  // ngOnInit() {
  //   console.log(this.data);
  // }

  onSubmit() {
    console.log(this.checklistSelection.selected);
  }

  // onClose() {
  //   // form reset
  //   this.dialogRef.close();
  // }

  // //--------------------------------------------------------------------


}


