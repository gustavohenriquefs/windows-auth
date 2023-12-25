import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { loginReducer } from './store/login-page/login-page.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageStore } from './store/login-page/login-page.effects';
import { UserImplementationRepository } from './data/repositories/user/user-implementation.repository';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const appConfig: ApplicationConfig = {
  providers: [
    UserImplementationRepository,
    provideStore(),
    provideState({ name: 'login', reducer: loginReducer }),
    importProvidersFrom(
      StoreModule.forRoot({ login: loginReducer }),
      EffectsModule.forRoot([LoginPageStore]),    
      HttpClientModule,
      FontAwesomeModule
    ),
    provideRouter(routes), 
    provideClientHydration()
  ]
};
