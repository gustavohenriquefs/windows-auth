import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MsalModule } from '@azure/msal-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';
import { routes } from './app.routes';
import { msalModuleConfig } from './config/azure-ad.config';
import { UserImplementationRepository } from './data/repositories/user/user-implementation.repository';
import { LoginEffects } from './store/login/login.effects';
import { loginReducer } from './store/login/login.reducer';

const {
  msalGuardConfiguration,
  msalInterceptorConfiguration,
  publicClientApp
} = msalModuleConfig;

export const appConfig: ApplicationConfig = {
 providers: [
 provideHttpClient(withFetch()),
 provideStore(),
 provideState({ name: 'login', reducer: loginReducer }),
 importProvidersFrom(
    StoreModule.forRoot({ login: loginReducer }),
    HttpClientModule,
    FontAwesomeModule,
    MsalModule.forRoot(
      publicClientApp,
      msalGuardConfiguration,
      msalInterceptorConfiguration
    ),
    EffectsModule.forRoot([ LoginEffects ]),
  ),
  provideRouter(routes),
  provideClientHydration(),
  UserImplementationRepository,
  environment.production ? 
    [] : provideStoreDevtools({ maxAge: 25 })
 ]
};