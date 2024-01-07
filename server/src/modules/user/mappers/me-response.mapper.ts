import {User} from "../../../database/schemas/user.schema";
import {MeResponseDto} from "../dto/response/me.response-dto";


export class MeResponseMapper {
    static meDto(userObject:User): MeResponseDto {
        if (!userObject) {
            return null;
        }
        return {
            id: userObject._id,
            name: userObject.name,
            email: userObject.email,
            roles: userObject.roles ,
        };
    }
}