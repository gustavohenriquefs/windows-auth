import { UserRepositoryMock, userMock } from "../../../mock/user-repository.mock";
import { UserModel } from "../../models/user.model";
import { UserLoginWindowsUseCase } from "./user-login-windows.usecase";

describe(UserLoginWindowsUseCase.name, () => {
  let userLoginWindowsUseCase: UserLoginWindowsUseCase;

  beforeEach(async () => {
    userLoginWindowsUseCase = new UserLoginWindowsUseCase(new UserRepositoryMock());
  });

  it(`#${UserLoginWindowsUseCase.prototype.execute.name} should return an Observable of UserModel`, (done: DoneFn) => {
    userLoginWindowsUseCase
      .execute()
      .subscribe((user: UserModel) => {
        expect(user).toEqual(userMock);
        done();
      });
  });
});