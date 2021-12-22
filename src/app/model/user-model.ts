import { RoleModel } from "./role-model";

export interface UserModel {
    id : number
    email : string
    phone : string
    username : string
    locked : boolean
    enabled : boolean
    roles : RoleModel[]


}
