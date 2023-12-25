import { Injectable } from "@angular/core";
import { mergeMap, map, catchError, EMPTY, exhaustMap, pipe } from "rxjs";
import { LoginModel } from "../models/login";
import { login, loginSuccess, loginWindows } from "./login-page.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserImplementationRepository } from "../../data/repositories/user/user-implementation.repository";

@Injectable()
export class LoginPageStore {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    exhaustMap((action) => this.userRepository.login(action)
      .pipe(
        map((login: LoginModel) => loginSuccess({ login })),
        catchError(() => EMPTY)
      ))  
  ));

  loginWindows$ = createEffect(() => this.actions$.pipe(
    ofType(loginWindows),
    exhaustMap(() => {
        console.log('loginWindows');
        return this.userRepository.loginWindows()
      }),
      map((login: LoginModel) => loginWindows(login)),
      catchError(() => EMPTY)
    )  
  );

  constructor(
    private actions$: Actions,
    private userRepository: UserImplementationRepository
  ) { }
}