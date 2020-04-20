import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { AccountComponent } from "./components/account/account.component";
import { SetupComponent } from "./components/setup/setup.component";
import { GameComponent } from "./components/game/game.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { GameServiceService } from './components/game/game-service.service'; 
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    SetupComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule.forRoot(
      environment.firebase,
                 () => 'your_app_name_factory',
                {
                  enableFirestoreSync: true, // enable/disable autosync users with firestore
                  toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
                  toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
                  authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
                  authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
                  passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
                  passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
                  // Same as password but for the name
                  nameMaxLength: 50,
                  nameMinLength: 2,
                  // If set, sign-in/up form is not available until email has been verified.
                  // Plus protected routes are still protected even though user is connected.
                  guardProtectedRoutesUntilEmailIsVerified: true,
                  enableEmailVerification: true, // default: true
    })
  ],
  providers: [GameServiceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
