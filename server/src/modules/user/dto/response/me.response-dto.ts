import { PickType } from '@nestjs/swagger';

import { UserBaseDto } from '../request';

export class MeResponseDto extends PickType(UserBaseDto, [
  'id',
  'name',
  'email',
  'roles',
]) {}
