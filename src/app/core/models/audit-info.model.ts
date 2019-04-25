export class AuditInfo {
  createdAt: number;
  updatedAt: number;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  updatedBy: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}