import {
  ECourses,
  ECoursesFormat,
  ECoursesType,
  EStatus,
} from '../enums/application-enums';

export interface IApplication {
  _id: string;
  age: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  course: ECourses;
  course_format: ECoursesFormat;
  course_type: ECoursesType;
  status: EStatus;
  sum?: number;
  already_paid?: number;
  createdAt: Date;
  updatedAt: Date;
}
