import { Observable, of, take } from "rxjs";
import { UserModel } from "../domain/models/user.model";
import { UserRepository } from "../domain/repositories/user.repository";

export const userMock: UserModel = {
  id: '1',
  email: 'test@mail.com',
  name: 'user_test',
  password: '123456',
  passwordConfirmation: '123456',
  token: 'token_mock'
};

export class UserRepositoryMock extends UserRepository {
  override loginWindows(): Observable<UserModel> {
    return of(userMock)
      .pipe(take(1));
  }
  override login(params: { email: string; password: string; }): Observable<UserModel> {
    return of(userMock)
      .pipe(take(1));
  }
  override register(params: { name: string; email: string; password: string; }): Observable<UserModel> {
    return of(userMock)
      .pipe(take(1));
  }

  override getUserProfile(): Observable<UserModel> {
    return of(userMock)
      .pipe(take(1));
  }
}