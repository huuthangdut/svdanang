import { Department } from './department.model';
import { Role } from "./role.model";

class User {
  id: number;
  userName: string;
  lastName: string;
  firstName: string;
  avatar: string;
  email: string;
  department: Department;
  roles: Role[];
  isActive: boolean;
}

class UserModel {
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

export { User, UserModel }

