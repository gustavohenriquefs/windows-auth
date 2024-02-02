import { UserModel } from "../../models/user.model";
import { GetUserProfileUseCase } from "./get-user-profile.usecase";
import { UserRepositoryMock, userMock } from "../../../mock/user-repository.mock";

describe(GetUserProfileUseCase.name, () => {

  let getUserProfileUseCase: GetUserProfileUseCase;

  beforeEach(async () => {
    getUserProfileUseCase = new GetUserProfileUseCase(new UserRepositoryMock());
  });

  it(`#${GetUserProfileUseCase.prototype.execute.name} should return an Observable of UserModel`, (done: DoneFn) => {
    getUserProfileUseCase
      .execute()
      .subscribe((user: UserModel) => {
        expect(user).toEqual(userMock);
        done();
      });
  });
});