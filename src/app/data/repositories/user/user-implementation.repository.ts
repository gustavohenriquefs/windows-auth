import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationResult } from '@azure/msal-browser';
import { Observable, map } from 'rxjs';
import * as uuid from 'uuid';
import { UserModel } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { MsalService } from '@azure/msal-angular';

const BASE_URL = 'https://localhost:44310';

@Injectable({
  providedIn: 'root'
})
export class UserImplementationRepository extends UserRepository {
  
  private app: any;

  constructor(private http: HttpClient, private msalService: MsalService) {
    super();

    this.msalService.initialize();
  }
  
  logout() {
    this.app.logout();
  }
  
  getToken() {
    return this.app.acquireTokenSilent({
      scopes: ['api-scope'],
    });
  }
  
  override login(params: { email: string; password: string; }): Observable<UserModel> {
    const result: UserModel = {
      id: uuid.v4(), 
      name: 'test',
      ...params,
      token: 'bearer token'
    };
    
    return this.http.post<UserModel>(`${BASE_URL}/login`, result);
  }
  
  override register(params: { name: string; email: string; password: string; }): Observable<UserModel> {
    throw new Error('Method not implemented.');
  }
  
  override getUserProfile(): Observable<UserModel> {
    throw new Error('Method not implemented.');
  }
  
  override loginWindows(): Observable<UserModel> {
    const _windowsUserData: Observable<AuthenticationResult>  = this.msalService.loginPopup();

    return _windowsUserData.pipe(
      map((response: AuthenticationResult) => {
        const result: UserModel = {
          id: uuid.v4(), 
          name: 'test',
          email: response.account.username,
          token: response.accessToken
        };
        
        return result;
      }
    ));
  }
}
