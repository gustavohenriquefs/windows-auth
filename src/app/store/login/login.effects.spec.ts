import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, take } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UserImplementationRepository } from '../../data/repositories/user/user-implementation.repository';
import { UserRepositoryMock, userMock } from '../../mock/user-repository.mock';
import { UserActions } from './login.actions';
import { LoginEffects } from './login.effects';
import { loginFeatureKey } from './login.reducer';
import { CREATE_EFFECT_METADATA_KEY } from '@ngrx/effects/src/models';

const loginPopupResponseMock = {
  uniqueId: '142390890824W',
  accessToken: 'tokenMock',
  account: {
    name: 'test@gmail.com',
    username: 'test@gmail.com',
    idTokenClaims: {}
  }
} as AuthenticationResult;

@Injectable()
export class MockMsalService extends MsalService {
  override acquireTokenRedirect = jasmine
    .createSpy('acquireTokenRedirect')
    .and
    .returnValue(of({}));
  
  override loginPopup = jasmine
    .createSpy('loginPopup')
    .and
    .returnValue(of(loginPopupResponseMock));
}

describe(`#${LoginEffects.name}`, () => {
  let effects: LoginEffects;
  let router: Router;
  let actions$: Observable<any>;
  let userRepositoryMock: UserRepositoryMock = new UserRepositoryMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'signin-oidc', component: class {} }
        ])
      ],
      providers: [
        LoginEffects,
        { provide: UserImplementationRepository, useFactory: () => userRepositoryMock },
        { provide: MsalService, useClass: MockMsalService },
        provideMockActions(() => actions$)
      ]
    });
    
    effects = TestBed.inject(LoginEffects);
    router = TestBed.inject(Router);
  });

  it(`#loginWindowsUser$ should return '[${loginFeatureKey}] Logged In With Success'`, (done) => {
    const user = userMock;

    const expectedAction = UserActions
      .loggedInWithSuccess({ userAuth: user });

    actions$ = of(UserActions.userWindowsLogin());
 
    effects.loginWindowsUser$.subscribe(x => {
      expect(x).toEqual(expectedAction);
      done();
    });
  });

  it(`#loggedInWidthSuccess$ should redirect to ${environment.azureAd.callbackPath}`, fakeAsync(() => {
    actions$ = of(UserActions.loggedInWithSuccess({ userAuth: userMock }));

    spyOn(router, 'navigateByUrl');

    effects.loggedInWidthSuccess$
      .pipe(take(1))
      .subscribe((response) => {
        tick();
        expect(response.userAuth).toEqual(userMock);
      });
      
    tick();
    
    expect(router.navigateByUrl).toHaveBeenCalledWith(environment.azureAd.callbackPath);
    expect
  }));

  it(`#loggedFailure$ should alert the error message`, fakeAsync(() => {
    const error = 'Error message';

    actions$ = of(UserActions.loggedFailure({ error }));

    spyOn(window, 'alert');

    effects.loggedFailure$
      .pipe(take(1))
      .subscribe((response) => {
        tick();
        expect(response.error).toEqual(error);
      });
      
    tick();
    
    expect(window.alert).toHaveBeenCalledWith(error);
  }));

  it(`#UserActions should have the following actions`, () => {
    const actions = Object.keys(UserActions);

    expect(actions).toEqual([
      'userLogin',
      'userWindowsLogin',
      'loggedInWithSuccess',
      'loggedFailure',
      'loggedFailureMessage',
      'logout'
    ]);
  });

  it(`#loginWindowsUser$ should call be called when'loginWindows' action be called`, () => {
    spyOn(effects.loginWindowsUser$, 'subscribe');

    actions$ = of(UserActions.userWindowsLogin());

    effects.loginWindowsUser$
      .pipe(take(1))
      .subscribe(() => actions$.subscribe());

    expect(effects.loginWindowsUser$).toHaveBeenCalled();
  });
});
