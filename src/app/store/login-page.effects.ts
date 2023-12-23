import { Injectable } from "@angular/core";
import { mergeMap, map, catchError, EMPTY, exhaustMap } from "rxjs";
import { LoginModel } from "./login";
import { login } from "./login-page.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserRepository } from "../domain/repositories/user.repository";

@Injectable()
export class LoginPageStore {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    exhaustMap((action) => this.userRepository.login(action)
      .pipe(
        map((login: LoginModel) => login),
        catchError(() => EMPTY)
      ))  
  ))

  constructor(
    private actions$: Actions,
    private userRepository: UserRepository
  ) { }
}