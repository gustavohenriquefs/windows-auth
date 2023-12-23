import { Mapper } from "../../../base/utils/mapper";
import { UserModel } from "../../../domain/models/user.model";
import { UserEntity } from "../user/entities/user-entity";

export class UserImplementationMapper extends Mapper<UserEntity, UserModel> {
    mapFrom(param: UserEntity) {
        return {
            id: param.id,
            name: param.name,
            email: param.email,
            password: param.password,
            passwordConfirmation: param.passwordConfirmation,
            token: param.token
        };
    }
    
    mapTo(param: UserModel) {
        return {
            id: param.id,
            name: param.name,
            email: param.email,
            password: param.password,
            passwordConfirmation: param.passwordConfirmation,
            token: param.token
        };
    }
}