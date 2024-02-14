import { PickType } from '@nestjs/swagger';

import { ManagerBaseDto } from '../request';

export class MeResponseDto extends PickType(ManagerBaseDto, [
  '_id',
  'name',
  'surname',
  'email',
  'roles',
  'isActive',
  'last_login',
]) {}
