import { importProvidersFrom } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeAuth, provideAuth } from '@angular/fire/auth';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  PhoneAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import { auth } from 'firebaseui';
import { provideFirebaseUi } from 'ngx-firebaseui';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login.component';
import { SecondPageComponent } from './app/second-page.component';

const firebaseUiAuthConfig: auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
      customParameters: {
        auth_type: 'reauthenticate',
      },
      provider: FacebookAuthProvider.PROVIDER_ID,
    },
    TwitterAuthProvider.PROVIDER_ID,
    GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: EmailAuthProvider.PROVIDER_ID,
    },
    PhoneAuthProvider.PROVIDER_ID,
    auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: auth.CredentialHelper.GOOGLE_YOLO,
};

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      [
        {
          path: '',
          component: LoginComponent,
        },
        {
          path: 'second',
          component: SecondPageComponent,
        },
      ],
      withEnabledBlockingInitialNavigation()
    ),
    provideFirebaseUi(firebaseUiAuthConfig),

    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => initializeAuth(getApp())),
    ]),
  ],
}).catch((err) => console.error(err));
