import { Manager } from '../../../database/schemas';
import { MeResponseDto } from '../dto/response/me.response-dto';

export class MeResponseMapper {
  static meDto(managerObject: Manager): MeResponseDto {
    if (!managerObject) {
      return null;
    }
    return {
      id: managerObject._id,
      name: managerObject.name,
      email: managerObject.email,
      roles: managerObject.roles,
    };
  }
}
