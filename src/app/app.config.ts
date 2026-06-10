import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyB2eP5rxxRxmLVQn16TWFmUfiReRp5aHE4',
        authDomain: 'devduo-studio-443e1.firebaseapp.com',
        projectId: 'devduo-studio-443e1',
        storageBucket: 'devduo-studio-443e1.firebasestorage.app',
        messagingSenderId: '671934688954',
        appId: '1:671934688954:web:28b6b1a743c42bc3081c83',
      })
    ),

    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};