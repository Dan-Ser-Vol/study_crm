import {
  ECourses,
  ECoursesFormat,
  ECoursesType,
  EStatus,
} from '../enums/application-enums';
import {IManager} from "./manager.interface";

export interface IApplication {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: ECourses | null;
  course_format: ECoursesFormat | null;
  course_type: ECoursesType | null;
  sum: number | null;
  already_paid: number | null;
  created_at: Date;
  utm: string;
  msg: IComment[] | string[];
  status: EStatus | null;
  manager: IManager | null;
  updated_at: Date;
  group: string | null;
}

export interface IComment {
  _id: string;
  message: string;
  created_at: Date;
  manager: {
    name: string;
    roles: string[];
  };
}
