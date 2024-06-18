import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ringoffire-140e7","appId":"1:295619248719:web:5d641b43355355f85a603a","storageBucket":"ringoffire-140e7.appspot.com","apiKey":"AIzaSyCwPrexe6M1vflwheWhVDZMcgEtCC2AEig","authDomain":"ringoffire-140e7.firebaseapp.com","messagingSenderId":"295619248719"})), provideFirestore(() => getFirestore())]
};
