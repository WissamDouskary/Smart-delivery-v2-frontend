import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, httpResource, provideHttpClient, withFetch } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AUTH_PROVIDERS } from './features/auth/auth.providers';
import { CORE_PROVIDERS } from './core/core.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    AUTH_PROVIDERS,
    CORE_PROVIDERS
  ],
};
