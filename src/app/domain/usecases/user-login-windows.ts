import { UserRepository } from "../repositories/user.repository";

export class UserLoginWindowsUseCase {
    constructor(private userRepository: UserRepository) {}
 
    execute() {
        return this.userRepository.loginWindows();
    }
}