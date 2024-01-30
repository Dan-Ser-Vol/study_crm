import { PickType } from '@nestjs/swagger';

import { ManagerBaseDto } from '../request';

export class MeResponseDto extends PickType(ManagerBaseDto, [
  'id',
  'name',
  'email',
  'roles',
]) {}
