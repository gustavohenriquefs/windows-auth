import { UserRepositoryMock, userMock } from "../../../mock/user-repository.mock";
import { UserModel } from "../../models/user.model";
import { UserRegisterUseCase } from "./user-register.usecase";

describe(UserRegisterUseCase.name, () => {
  let userRegisterUseCase: UserRegisterUseCase;

  beforeEach(async () => {
    userRegisterUseCase = new UserRegisterUseCase(new UserRepositoryMock());
  });

  it(`#${UserRegisterUseCase.prototype.execute.name} should return an Observable of UserModel`, (done: DoneFn) => {
    const userRegisterMock = {
      name: 'user_test',
      email: 'test@mail.com',
      password: '123456',
    }

    userRegisterUseCase
      .execute(userRegisterMock)
      .subscribe((user: UserModel) => {
        expect(user).toEqual(userMock);
        done();
      });
  });
});