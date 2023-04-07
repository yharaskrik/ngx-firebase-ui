# ngx-firebase-ui

![Screenshot of Login screen](https://raw.githubusercontent.com/RaphaelJenni/FirebaseUI-Angular/master/assets/LoginScreen.PNG)

**Originally forked from: https://www.npmjs.com/package/firebaseui-angular but updated for maintainability and removing the firebase compat APIs**

## Compatibility

To set this library up for the future this library requires a version of Angular that supports both Standalone Components and the `inject` function.

## Installation

To install this library, run (or `yarn` or any other package manager):

```bash
$ npm install ngx-firebase-ui
```

To run this library you need to have the following installed:

1. [AngularFire2](https://github.com/angular/angularfire2)
2. [Firebase](https://firebase.google.com/docs/web/setup),
3. [FirebaseUI-Web](https://github.com/firebase/firebaseui-web)

```bash
$ npm install firebase firebaseui @angular/fire ngx-firebase-ui
```

## How to use

Add the `FirebaseUIModule` with the config to your imports. Make sure you have
initialized [AngularFire](https://github.com/angular/angularfire2) correctly.

```typescript
import { EmailAuthProvider, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, PhoneAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { auth } from 'firebaseui';

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
  providers: [provideFirebaseUi(firebaseUiAuthConfig), importProvidersFrom([provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => initializeAuth(getApp()))])],
}).catch((err) => console.error(err));
```

This will also work with modules, just do a similar thing in your `AppModule` instead of the `bootstrapApplication`

### Add the firebaseui css to your imports:

**Option 1: CSS Import**

_May be incompatible with older browsers._

Import the firebaseui css to your `src/styles.(scss|css)` file:

```css
@import '~firebaseui/dist/firebaseui.css';
```

**Option 2: Angular-CLI**

File: `angular.json` (or if using Nx your `project.json` or `workspace.json`)

Path: `"node_modules/firebaseui/dist/firebaseui.css"`

```json
{
  "build": {
    "options": {
      "styles": ["node_modules/firebaseui/dist/firebaseui.css"]
    }
  }
}
```

**Option 3: HTML Link**

Put this in the `<head>` tag of your `index.html` file:

```html
<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.0.0/firebaseui.css" />
```

Make sure the version number matches the version of firebaseui you have installed with npm.

Once everything is set up, you can use the component in your Angular application:

```angular2html
<firebase-ui></firebase-ui>
```

## License

MIT © Jay Bell
