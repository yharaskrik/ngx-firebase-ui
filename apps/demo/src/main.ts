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
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: 'AIzaSyDIuel03xeL0Jf_rvBsySqYtRU_YsTqA9s',
          authDomain: 'trellis-dev-1db6a.firebaseapp.com',
          databaseURL: 'https://trellis-dev-1db6a.firebaseio.com',
          projectId: 'trellis-dev-1db6a',
          storageBucket: 'trellis-dev-1db6a.appspot.com',
          messagingSenderId: '1044253807771',
          appId: '1:1044253807771:web:556afb9f809418e678223e',
          measurementId: 'G-ZCGYLLVD2P',
        })
      ),
      provideAuth(() => initializeAuth(getApp())),
    ]),
  ],
}).catch((err) => console.error(err));
