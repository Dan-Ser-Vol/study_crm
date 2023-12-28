import { PickType } from '@nestjs/swagger';

import { UserBaseDto } from './user.base-dto';

export class UserCreateDto extends PickType(UserBaseDto, [
  'name',
  'email',
  'password',
  'role',
]) {}
