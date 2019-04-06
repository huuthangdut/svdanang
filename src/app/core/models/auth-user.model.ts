export class AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  accessToken: string;
  avatar?: string;
  grantedActions: string[];
}