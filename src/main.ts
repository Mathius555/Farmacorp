import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { AppModule } from './app/app.module';
import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const firebaseApp = initializeApp(environment.firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  defineCustomElements(window);
