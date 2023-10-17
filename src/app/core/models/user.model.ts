import { UserRoles } from './user-roles.enum';

export interface UserData {
  token: string;
  roles: UserRoles[];
  expiryDate: number;
}
