import { Component, inject, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
  NgxFirebaseUiComponent,
} from 'ngx-firebaseui';

@Component({
  selector: 'ngx-firebaseui-login',
  template: `
    <h1>FirebaseUI-Angular Sample</h1>
    <firebase-ui
      (signInSuccessWithAuthResult)="successCallback($event)"
      (signInFailure)="errorCallback($event)"
      (uiShown)="uiShownCallback()"
    ></firebase-ui>
    <button (click)="logout()">Logout</button>
    <button [routerLink]="['/page']">To second page</button>
  `,
  standalone: true,
  imports: [NgxFirebaseUiComponent, RouterLink],
})
export class LoginComponent implements OnInit {
  private afAuth = inject(Auth);

  private router = inject(Router);

  ngOnInit(): void {
    authState(this.afAuth).subscribe((d) => console.log(d));
  }

  logout() {
    this.afAuth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback', data);
    this.router.navigate(['second']);
  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
  }

  uiShownCallback() {
    console.log('UI shown');
  }
}
