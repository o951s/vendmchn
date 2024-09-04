import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // Burada `provideHttpClient` sağlanmış mı kontrol edin
    
  ]
});

export default bootstrap;
