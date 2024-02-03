import {
  ECourses,
  ECoursesFormat,
  ECoursesType,
  EStatus,
} from '../enums/application-enums';

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
  msg: IMessage[];
  status: EStatus | null;
  manager: string | null;
  updated_at: Date;
  group: string | null;
}

export interface IMessage {
  _id: string;
  manager: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
