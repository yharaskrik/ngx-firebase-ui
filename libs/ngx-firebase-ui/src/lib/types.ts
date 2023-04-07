import { AuthCredential, UserCredential } from '@angular/fire/auth';

export interface FirebaseUISignInSuccessWithAuthResult {
  authResult: UserCredential;
  redirectUrl: string;
}

export interface FirebaseUISignInFailure {
  code: string;
  credential: AuthCredential;
}
