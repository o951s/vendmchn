import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; // HttpClientModule'ü import edin
import { AppComponent } from './app.component';
import { withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from"@angular/platform-browser/animations/async"

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule), // Provide HttpClientModule correctly
    importProvidersFrom(CommonModule), // Import CommonModule as well
    
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
