import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Import provideRouter

// Assuming your app.routes.ts is in the 'app' subdirectory
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Add provideRouter with your routes
    importProvidersFrom(HttpClientModule),
    // Other service providers
  ],
})
  .catch((err) => console.error(err));