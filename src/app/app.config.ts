import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AUTH_PROVIDERS } from './features/auth/auth.providers';
import { CORE_PROVIDERS } from './core/core.providers';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authReducer } from './core/state/auth/auth.reducer';
import { colisReducer } from './core/state/colis/colis.reducer';
import { filtersReducer } from './core/state/filters/filters.reducer';
import { AuthEffects } from './core/state/auth/auth.effects';
import { ColisEffects } from './core/state/colis/colis.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    CORE_PROVIDERS,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    AUTH_PROVIDERS,
    provideStore({
      auth: authReducer,
      colis: colisReducer,
      filters: filtersReducer
    }),
    provideEffects([AuthEffects, ColisEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
