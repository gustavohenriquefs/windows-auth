import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, exhaustMap, map, mergeMap, take } from "rxjs";
import { UserImplementationRepository } from "../../data/repositories/user/user-implementation.repository";
import { login, loginSuccess, loginWindows } from "./login-page.actions";
import { UserModel } from "../../domain/models/user.model";

@Injectable()
export class LoginPageStore {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    exhaustMap((action) => this.userRepository.login(action)
      .pipe(
        map((user: UserModel) => loginSuccess(user)),
        catchError(() => EMPTY),
        take(1),
      ))  
  ));

  loginWindows$ = createEffect(() => this.actions$.pipe(
    ofType(loginWindows),
    mergeMap(() => {
      return this.userRepository.loginWindows().pipe(
        take(1),
        map((user: UserModel) => loginSuccess(user)),
        catchError(() => EMPTY)
      );
    })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    map((action) => {
      console.log(action);
      return action;
    })
  ), { dispatch: false });
  

  constructor(
    private actions$: Actions,
    private userRepository: UserImplementationRepository
  ) { }
}