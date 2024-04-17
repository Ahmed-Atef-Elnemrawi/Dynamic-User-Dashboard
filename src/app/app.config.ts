import {
  ApplicationConfig,
  InjectionToken,
  ValueProvider,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { backendUrl } from './core/models';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { appFeature } from './core/store/app-feature';
import { provideEffects } from '@ngrx/effects';
import { AppEffects } from './core/store/app-effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userFeature } from './user/data-access/user-feature';
import { UserEffects } from './user/data-access/user.effects';
import { cacheRequestInterceptor } from './core/cache-request/cache-request.interceptor';



//create token for backend url interface as TS doesn't
//support interfaces at runtime compilation.
export const BACKEND_URL_Token = new InjectionToken<backendUrl>('backend url');

const BACKEND_URL = {
  usersUrl: 'https://reqres.in/api/users',
};

//create a backend url provide to root environment
//so the entire app can access it.
const provideBackendUrl: ValueProvider = {
  provide: BACKEND_URL_Token,
  useValue: BACKEND_URL,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBackendUrl,
    provideHttpClient(withInterceptors([cacheRequestInterceptor])),
    provideStore(),
    provideState(appFeature),
    provideState(userFeature),
    provideEffects([AppEffects, UserEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};
