import type { OnDestroy } from '@angular/core';
import { Component, EventEmitter, inject, NgZone, Output } from '@angular/core';
import type { User, UserCredential } from '@angular/fire/auth';
import { Auth, authState } from '@angular/fire/auth';
import type { auth } from 'firebaseui';
import { filter } from 'rxjs';
import { AUTH_CONFIG, injectConfig } from './tokens';
import type {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from './types';

@Component({
  selector: 'firebase-ui',
  template: '<div id="firebaseui-auth-container"></div>',
  standalone: true,
})
export class NgxFirebaseUiComponent implements OnDestroy {
  private static readonly COMPUTED_CALLBACKS = 'COMPUTED_CALLBACKS';

  private readonly auth = inject(Auth);

  private readonly ngZone = inject(NgZone);

  private readonly rootConfig = inject(AUTH_CONFIG);

  private readonly config = injectConfig();

  /**
   * Definitely not the best way to do this, but it will work, and it mimics how the original package was waorking.
   */
  private readonly subscription = authState(this.auth)
    .pipe(filter((user): user is User => user?.isAnonymous || !user))
    .subscribe(() => this.loadFirebaseUi());

  @Output() signInSuccessWithAuthResult =
    new EventEmitter<FirebaseUISignInSuccessWithAuthResult>();

  @Output() signInFailure = new EventEmitter<FirebaseUISignInFailure>();

  @Output() uiShown = new EventEmitter<void>();

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private getUIAuthConfig(): auth.Config {
    if (!this.config.callbacks) {
      (this.config as any)[NgxFirebaseUiComponent.COMPUTED_CALLBACKS] = true;
      this.config.callbacks = this.getCallbacks();
    }

    return this.config;
  }

  private getCallbacks(): any {
    const signInSuccessWithAuthResultCallback = (
      authResult: UserCredential,
      redirectUrl: string
    ) => {
      this.ngZone.run(() => {
        this.signInSuccessWithAuthResult.emit({
          authResult,
          redirectUrl,
        });
      });
      return this.config.signInSuccessUrl;
    };

    const signInFailureCallback = (error: auth.AuthUIError) => {
      this.ngZone.run(() => {
        this.signInFailure.emit({
          code: error.code,
          credential: error.credential,
        });
      });
      return Promise.reject();
    };

    const uiShownCallback = () => {
      this.ngZone.run(() => {
        this.uiShown.emit();
      });
    };

    return {
      signInSuccessWithAuthResult: signInSuccessWithAuthResultCallback,
      signInFailure: signInFailureCallback,
      uiShown: uiShownCallback,
    };
  }

  private loadFirebaseUi() {
    const firebaseUiInstance = (<any>window).firebaseUiInstance;

    const uiAuthConfig = this.getUIAuthConfig();

    // Check if callbacks got computed to reset them again after providing to the firebaseui sdk.
    // Necessary for allowing updating the firebaseui auth.config during runtime.
    let resetCallbacks = false;
    if ((uiAuthConfig as any)[NgxFirebaseUiComponent.COMPUTED_CALLBACKS]) {
      resetCallbacks = true;
      delete (uiAuthConfig as any)[NgxFirebaseUiComponent.COMPUTED_CALLBACKS];
    }

    // show the firebaseui
    firebaseUiInstance.start('#firebaseui-auth-container', uiAuthConfig);

    if (resetCallbacks) {
      this.config.callbacks = undefined;
    }
  }
}
