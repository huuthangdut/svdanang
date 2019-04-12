class Role {
  id: number;
  name: string;
  description: string;
}

class RoleModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public grantedActions: number[]
  ) {

  }
}

export { Role, RoleModel }