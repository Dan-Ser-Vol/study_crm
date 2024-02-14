import { Manager } from '../../../database/schemas';
import { MeResponseDto } from '../dto/response/me.response-dto';

export class MeResponseMapper {
  static meDto(managerObject: Manager): MeResponseDto {
    if (!managerObject) {
      return null;
    }
    return {
      _id: managerObject._id,
      name: managerObject.name,
      surname: managerObject.surname,
      email: managerObject.email,
      roles: managerObject.roles,
      isActive: managerObject.isActive,
      last_login: managerObject.last_login,
    };
  }
}
