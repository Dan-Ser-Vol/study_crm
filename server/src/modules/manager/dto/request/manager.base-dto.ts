import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { ManagerRoleEnum } from '../../../role/enum/role-enum';

export class ManagerBaseDto {
  @ApiProperty({ example: '567' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Bob' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Smith' })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ example: 'example@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum({ enum: ManagerRoleEnum.ADMIN })
  roles: string[];
}
