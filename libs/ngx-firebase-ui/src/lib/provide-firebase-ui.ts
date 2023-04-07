import { ENVIRONMENT_INITIALIZER, inject, Provider } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { auth } from 'firebaseui';
import { AUTH_CONFIG, AUTH_FEATURE_CONFIG } from './tokens';

/**
 * Initializes the firebase ui instance as the environment is initialized.
 */
export function provideFirebaseUi(config: auth.Config): Provider[] {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue() {
        const firebaseAuth = inject(Auth);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(<any>window).firebaseUiInstance) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (<any>window).firebaseUiInstance = new auth.AuthUI(firebaseAuth);
        }
      },
      multi: true,
    },
    {
      provide: AUTH_CONFIG,
      useValue: config,
    },
    {
      provide: AUTH_FEATURE_CONFIG,
      useValue: {},
    },
  ];
}
