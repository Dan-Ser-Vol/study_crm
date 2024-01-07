import {PickType} from '@nestjs/swagger';
import {UserBaseDto} from "../request/user.base-dto";


export class MeResponseDto extends PickType(UserBaseDto, [
    'id',
    'name',
    'email',
    'roles',
]) {
}
