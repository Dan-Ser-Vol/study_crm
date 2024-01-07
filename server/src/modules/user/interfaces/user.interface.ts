import {UserRoleEnum} from "../../role/enum/role-enum";

export interface IUser {
    _id: string,
    name: string,
    email:string,
    roles: UserRoleEnum,
}