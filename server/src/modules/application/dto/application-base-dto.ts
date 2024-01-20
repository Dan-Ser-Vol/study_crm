import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ECourses,
  ECursesFormat,
  ECursesType,
  EStatus,
} from '../../../database/schemas/application/enums';

export class ApplicationBaseDto {
  @ApiProperty({
    example: '554oho5wah5oa',
    description: 'user ID',
  })
  @IsString()
  _id: string;

  @ApiProperty({
    example: '34',
    description: 'Age of the user',
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ example: 'Bob', description: 'User name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Smith', description: 'User surname' })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ example: 'smith@gmail.com', description: 'User email' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+38 068 563 4545',
    description: 'User phone number',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: ' FS or QACX',
    enum: ECourses,
    default: ECourses.JCX,
    description: 'The course name',
  })
  @IsEnum(ECourses)
  @IsNotEmpty()
  course: ECourses;

  @ApiProperty({
    enum: ECursesFormat,
    default: ECursesFormat.ONLINE,
    description: 'The course format',
  })
  @IsEnum(ECursesFormat)
  @IsNotEmpty()
  course_format: ECursesFormat;

  @ApiProperty({
    enum: ECursesType,
    default: ECursesType.VIP,
    description: 'The course type',
  })
  @IsEnum(ECursesType)
  @IsNotEmpty()
  course_type: ECursesType;

  @ApiProperty({
    enum: EStatus,
    default: EStatus.NEW,
    description: 'The application status',
  })
  @IsEnum(EStatus)
  @IsNotEmpty()
  status: EStatus;

  @ApiProperty({ example: '34000', description: 'Price of course' })
  @IsNumber()
  sum: number;

  @ApiProperty({ example: '3900', description: 'already paid ' })
  @IsNumber()
  @IsOptional()
  already_paid: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
