import { Observable } from "rxjs";
import { UserModel } from "../../models/user.model";
import { UserRepository } from "../../repositories/user.repository";
import { UseCase } from "../../use-cases";

export class GetUserProfileUseCase implements UseCase<void, UserModel> {
  constructor(private userRepository: UserRepository) {}
  
  execute(): Observable<UserModel> {
    return this.userRepository.getUserProfile();
  }
}