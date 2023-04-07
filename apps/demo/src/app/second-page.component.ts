import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import type { FirebaseUISignInSuccessWithAuthResult } from 'ngx-firebaseui';
import { NgxFirebaseUiComponent } from 'ngx-firebaseui';

@Component({
  selector: 'ngx-firebaseui-second-page',
  template: `
    <p>second-page works</p>
    <firebase-ui (signInSuccessWithAuthResult)="successCallback($event)">
    </firebase-ui>
    <button (click)="logout()">Logout</button>
    <button [routerLink]="['/']">Back to main</button>
  `,
  standalone: true,
  imports: [NgxFirebaseUiComponent, RouterLink],
})
export class SecondPageComponent implements OnInit {
  constructor(private afAuth: Auth) {}

  ngOnInit(): void {
    authState(this.afAuth).subscribe((d) => console.log(d));
  }

  logout() {
    this.afAuth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log(data);
  }
}
