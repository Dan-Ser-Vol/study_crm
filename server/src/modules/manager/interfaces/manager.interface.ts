import { ManagerRoleEnum } from '../../role/enum/role-enum';

export interface IManager {
  _id: string;
  name: string;
  surname: string;
  email: string;
  roles: ManagerRoleEnum;
}
