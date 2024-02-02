import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserImplementationRepository } from './repositories/user/user-implementation.repository';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserRegisterUseCase } from '../domain/usecases/user-register/user-register.usecase';
import { GetUserProfileUseCase } from '../domain/usecases/get-user-profile/get-user-profile.usecase';

const userRegisterUseCaseFactory = 
  (userRepo: UserRepository) => new UserRegisterUseCase(userRepo);

export const userRegisterUseCaseProvider = {
  provide: UserRegisterUseCase,
  useFactory: userRegisterUseCaseFactory,
  deps: [UserRepository],
};

const getUserProfileUseCaseFactory = 
  (userRepo: UserRepository) => new GetUserProfileUseCase(userRepo);

export const getUserProfileUseCaseProvider = {
  provide: GetUserProfileUseCase,
  useFactory: getUserProfileUseCaseFactory,
  deps: [UserRepository],
};

@NgModule({
  providers: [
      userRegisterUseCaseProvider,
      getUserProfileUseCaseProvider,
      { 
        provide: UserRepository, 
        useClass: UserImplementationRepository 
      },
  ],
  imports: [
      CommonModule,
      HttpClientModule,
  ],
})
export class DataModule { }