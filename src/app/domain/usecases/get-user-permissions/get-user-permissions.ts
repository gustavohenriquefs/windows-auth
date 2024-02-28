import { Observable } from "rxjs";
import { Permission } from "../../models/permisssion.model";
import { UserRepository } from "../../repositories/user.repository";
import { UseCase } from "../../use-cases";

export class GetUserPermissions implements UseCase<void, Permission[]> {
  constructor(private userRepository: UserRepository) {}
  
  execute(): Observable<Permission[]> {
    return this.userRepository.getUserRequestsPermissions();
  }
}