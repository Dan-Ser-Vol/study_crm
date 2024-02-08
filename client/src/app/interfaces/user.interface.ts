import { IApplication } from './application.interface';

export interface IUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface IManager {
  _id: string;
  applications: IApplication[];
  createdAt: Date;
  email: string;
  isActive: boolean;
  last_login: Date;
  name: string;
  roles: string;
  surname: string;
  updatedAt: Date;
}
