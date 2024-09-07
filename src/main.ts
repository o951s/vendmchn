import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Import Bootstrap's JavaScript
import $ from 'jquery';  // Import jQuery
import { environment } from './environment/environment';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';




const appConfig = {
  providers: [
    provideRouter(appRoutes),  // Yönlendirme sağlayıcısı
    provideHttpClient(withFetch()), // HttpClient'i sağlamak için
    provideAnimations()
  ]
};

if (environment.production) {
  // Production ortamı için ek yapılandırmalar varsa buraya ekleyebilirsiniz
}

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));