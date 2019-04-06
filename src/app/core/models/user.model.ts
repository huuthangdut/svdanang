import { DepartmentModel } from './department.model';
import { RoleModel } from "./role.model";

class UserModel {
  id: number;
  userName: string;
  lastName: string;
  firstName: string;
  avatar: string;
  email: string;
  department: DepartmentModel;
  roles: RoleModel[];
  isActive: boolean;
}

class FormUserModel {
  constructor(
    public id: number,
    public userName: string,
    public lastName: string,
    public firstName: string,
    public avatar: string,
    public email: string,
    public password: string,
    public departmentId: number,
    public roles: number[],
    public isActive: boolean,
  ) {

  }
}

export { UserModel, FormUserModel }

