import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig, // ✅ Mantiene la configurazione esistente
  providers: [
    ...appConfig.providers || [], // ✅ Mantiene i provider esistenti in `appConfig`
    provideHttpClient() // ✅ Aggiunge il modulo HTTP per le chiamate API
  ]
}).catch(err => console.error(err));
