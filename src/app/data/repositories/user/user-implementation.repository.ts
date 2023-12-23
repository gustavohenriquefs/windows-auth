import { Injectable } from '@angular/core';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { Observable } from 'rxjs';
import { UserModel } from '../../../domain/models/user.model';
import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserImplementationRepository extends UserRepository {
  
  constructor(private http: HttpClient) {
    super();
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
}
