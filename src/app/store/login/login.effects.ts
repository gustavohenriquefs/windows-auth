import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, take } from "rxjs";
import { environment } from '../../../environments/environment.development';
import { UserImplementationRepository } from '../../data/repositories/user/user-implementation.repository';
import { UserActions } from './login.actions';

const homePath = environment.azureAd.callbackPath;

@Injectable()
export class LoginEffects {
  loginWindowsUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserActions.userWindowsLogin),
      switchMap(() => 
        this.userImplementationRepository
          .loginWindows()
          .pipe(take(1))),
      map(userAuth => UserActions.loggedInWithSuccess({ userAuth }))  
  ));

  loggedInWidthSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loggedInWithSuccess),
      map((userState) => {
        this.router.navigateByUrl(homePath);
        return userState;
      })), 
      { dispatch: false }
  );

  loggedFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loggedFailure),
      map((user) => {
        alert(user.error);
        
        return user;
      })), 
      { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userImplementationRepository: UserImplementationRepository,
    private router: Router
  ) {}
}