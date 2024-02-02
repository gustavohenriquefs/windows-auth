import { Observable } from "rxjs";
import { UserModel } from "../../models/user.model";
import { UserRepository } from "../../repositories/user.repository";

export class UserLoginWindowsUseCase {
    constructor(private userRepository: UserRepository) {}
 
    execute(): Observable<UserModel> {
        return this.userRepository.loginWindows();
    }
}