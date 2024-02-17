import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

import { Manager } from '../../../../database/schemas';
import {
  ECourses,
  ECursesFormat,
  ECursesType,
  EStatus,
} from '../../../../database/schemas/application/enums';

export class ApplicationResponseDto {
  @ApiProperty({ description: 'name of student' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'surname of student' })
  @IsString()
  surname: string;

  @ApiProperty({ description: 'email of student' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'phone of student' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'age of student' })
  @IsNumber()
  age: number;

  @ApiProperty({ description: 'curses', enum: ECourses })
  @IsEnum(ECourses)
  course: ECourses;

  @ApiProperty({ description: 'format of course', enum: ECursesFormat })
  @IsEnum(ECursesFormat)
  course_format: ECursesFormat;

  @ApiProperty({ description: 'type of course', enum: ECursesType })
  @IsEnum(ECursesType)
  course_type: ECursesType;

  @ApiProperty({ description: 'course price' })
  @IsNumber()
  sum: number;

  @ApiProperty({ description: 'how much has already been paid' })
  @IsNumber()
  already_paid: number;

  @ApiProperty({ description: 'date of creation of the application' })
  @IsDate()
  created_at: Date;

  @ApiProperty()
  utm: string;

  @ApiProperty({ description: 'comments Left by the manager' })
  @IsArray()
  msg: Comment[];

  @ApiProperty({ description: 'status is static or online', enum: EStatus })
  @IsEnum(EStatus)
  status: EStatus;

  @ApiProperty({ description: 'group name' })
  @IsString()
  group: string;

  @ApiProperty({ description: 'manager of application' })
  manager: Manager;
}
