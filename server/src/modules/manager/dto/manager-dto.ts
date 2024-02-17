import { ApiProperty } from '@nestjs/swagger';

import { ManagerRoleEnum } from '../../role/enum/role-enum';

export class ManagerDto {
  @ApiProperty({ description: 'Unique identifier of the manager' })
  _id: string;

  @ApiProperty({ description: "Manager's first name" })
  name: string;

  @ApiProperty({ description: "Manager's last name" })
  surname: string;

  @ApiProperty({ description: "Manager's email address" })
  email: string;

  @ApiProperty({ description: 'Indicates if the manager is active or not' })
  isActive: boolean;

  @ApiProperty({
    description: 'Roles assigned to the manager',
    enum: ManagerRoleEnum,
    isArray: true,
  })
  roles: ManagerRoleEnum[];

  @ApiProperty({ description: "Date and time of the manager's last login" })
  last_login: Date;

  @ApiProperty({
    description: 'IDs of applications associated with the manager',
  })
  applications: string[]; // якщо ви хочете передати лише id заявок
}
