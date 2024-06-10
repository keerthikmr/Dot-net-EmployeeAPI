import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { AuthenticationInterceptor } from './services/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withInterceptors([AuthenticationInterceptor]))]
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthenticationInterceptor,
    //   multi: true
    // }
  // ]
};
