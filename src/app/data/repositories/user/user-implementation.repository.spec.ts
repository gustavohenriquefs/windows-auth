import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, take } from "rxjs";
import { UserModel } from "../../../domain/models/user.model";
import { AuthenticationResult } from "@azure/msal-browser";
import { UserImplementationRepository } from "./user-implementation.repository";
import { MSAL_INSTANCE, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { userMock } from "../../../mock/user-repository.mock";

let acquireTokenRedirectSpy: jasmine.Spy;
let loginPopupSpy: jasmine.Spy;

const loginPopupResponseMock = {
  uniqueId: '142390890824W',
  accessToken: 'token_mock',
  account: {
    name: 'test@gmail.com',
    username: 'test@gmail.com',
    idTokenClaims: {}
  }
} as AuthenticationResult;

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

describe('UserImplementationRepository', () => {
  let repository: UserImplementationRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserImplementationRepository,
        MsalService,
        MsalBroadcastService,
        { 
          provide: MSAL_INSTANCE, 
          useValue: {
            acquireTokenRedirect: acquireTokenRedirectSpy,
            loginPopup: loginPopupSpy,
            initializeWrapperLibrary: () => {},
            initialize: () => of({}),
          } 
        }
      ]
    });
    
    repository = TestBed.inject(UserImplementationRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it(`#${UserImplementationRepository.prototype.login.name} should return an Observable`, () => {
    const result = repository.login({ 
      email: 'test@gmail.com', 
      password: 'test@gmail.com' 
    });

    expect(typeof result).toBeTruthy();
  });

  it(`#${UserImplementationRepository.prototype.loginWindows.name} should return an access token from MsalService`, (done) => {
    const mockMsalService = TestBed.inject(MsalService);

    spyOn(mockMsalService, 'loginPopup').and.returnValue(
      of(loginPopupResponseMock)
    );

    const result: Observable<UserModel> = repository.loginWindows();

    result
      .pipe(take(1))
      .subscribe((response: UserModel) => {
        expect(mockMsalService.loginPopup).toHaveBeenCalled();
        expect(response.token).toBe(userMock.token);
      
        done();
      });

  });
}); 