import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import * as firebaseAuth from "firebase/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../core/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  async loginWithEmail(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  /**additionalUserInfo: GenericAdditionalUserInfo
   isNewUser: true
   profile: {}
   providerId: "password"
   [[Prototype]]: Object
   credential: null
   operationType: "signIn"
   user: User
   multiFactor: MultiFactorUserImpl
   enrolledFactors: []
   user: UserImpl
   accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5N2Q3ZmI1ZGNkZThjZDA0OGQzYzkxNThiNjIwYjY5MTA1MjJiNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVudG9yLWNhcGUtZGV2IiwiYXVkIjoibWVudG9yLWNhcGUtZGV2IiwiYXV0aF90aW1lIjoxNjUyNzQ5OTIzLCJ1c2VyX2lkIjoiNmNESVVldkp2MVF2OEZwR2g5dGlLbzhtekNNMiIsInN1YiI6IjZjRElVZXZKdjFRdjhGcEdoOXRpS284bXpDTTIiLCJpYXQiOjE2NTI3NDk5MjMsImV4cCI6MTY1Mjc1MzUyMywiZW1haWwiOiJpdmFuLnZvbG9zMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiaXZhbi52b2xvczFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.LxeItd-iTUztAnTtrlGyGX_Fk6ReN9fHBzMU2FIaZXdycToblzpOjR4-1UFF0yA5T4s-hYtbvNRl4mL5eGkNz9aTh4PHCrEnBOLG1ftELFSt-4D9LNgg-U7UVile1s3kMpFRAExevkHJFFotZ6MzduOTOXY41ubaICwKs75Mh9S1G6AJlXU_s12Itc8bVn-isnfRz0sQHbCa9be6xIlxamu2VT5UsI0RnEJQdVCJua2PnQlGt9M22gAsEDNNWudSLj7XuOygNzOe3KFOtWsz5d5w6f8_CnxsxjUnSpQ7E6LwIY9NwETpGAGZ2qIJGl1Icn3Kxu_TZh9MdpVNftbBuA"
   auth: AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, config: {…}, currentUser: UserImpl, emulatorConfig: null, …}
   displayName: null
   email: "ivan.volos1@gmail.com"
   emailVerified: false
   isAnonymous: false
   metadata: UserMetadata {createdAt: '1652749922831', lastLoginAt: '1652749922831', lastSignInTime: 'Tue, 17 May 2022 01:12:02 GMT', creationTime: 'Tue, 17 May 2022 01:12:02 GMT'}
   phoneNumber: null
   photoURL: null
   proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}
   providerData: [{…}]
   providerId: "firebase"
   reloadListener: userInfo => {…}
   reloadUserInfo: null
   stsTokenManager: StsTokenManager {refreshToken: 'AIwUaOntjUf1hoxrpkPprcc5qVAkLIjpNqay5vEJEPVCccUYWP…8amVO5WnAXFXbtSEuqHlTpTn7Uul4k7O5s586Dw19YNDTv5ZA', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5N2Q3ZmI1ZGNkZThjZD…pQ7E6LwIY9NwETpGAGZ2qIJGl1Icn3Kxu_TZh9MdpVNftbBuA', expirationTime: 1652753522621}
   tenantId: null
   uid: "6cDIUevJv1Qv8FpGh9tiKo8mzCM2"
   refreshToken: (…)
   [[Prototype]]: Object
   [[Prototype]]: Object
   _delegate: UserImpl
   accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5N2Q3ZmI1ZGNkZThjZDA0OGQzYzkxNThiNjIwYjY5MTA1MjJiNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVudG9yLWNhcGUtZGV2IiwiYXVkIjoibWVudG9yLWNhcGUtZGV2IiwiYXV0aF90aW1lIjoxNjUyNzQ5OTIzLCJ1c2VyX2lkIjoiNmNESVVldkp2MVF2OEZwR2g5dGlLbzhtekNNMiIsInN1YiI6IjZjRElVZXZKdjFRdjhGcEdoOXRpS284bXpDTTIiLCJpYXQiOjE2NTI3NDk5MjMsImV4cCI6MTY1Mjc1MzUyMywiZW1haWwiOiJpdmFuLnZvbG9zMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiaXZhbi52b2xvczFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.LxeItd-iTUztAnTtrlGyGX_Fk6ReN9fHBzMU2FIaZXdycToblzpOjR4-1UFF0yA5T4s-hYtbvNRl4mL5eGkNz9aTh4PHCrEnBOLG1ftELFSt-4D9LNgg-U7UVile1s3kMpFRAExevkHJFFotZ6MzduOTOXY41ubaICwKs75Mh9S1G6AJlXU_s12Itc8bVn-isnfRz0sQHbCa9be6xIlxamu2VT5UsI0RnEJQdVCJua2PnQlGt9M22gAsEDNNWudSLj7XuOygNzOe3KFOtWsz5d5w6f8_CnxsxjUnSpQ7E6LwIY9NwETpGAGZ2qIJGl1Icn3Kxu_TZh9MdpVNftbBuA"
   auth: AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, config: {…}, currentUser: UserImpl, emulatorConfig: null, …}
   displayName: null
   email: "ivan.volos1@gmail.com"
   emailVerified: false
   isAnonymous: false
   metadata: UserMetadata {createdAt: '1652749922831', lastLoginAt: '1652749922831', lastSignInTime: 'Tue, 17 May 2022 01:12:02 GMT', creationTime: 'Tue, 17 May 2022 01:12:02 GMT'}
   phoneNumber: null
   photoURL: null
   proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}
   providerData: [{…}]
   providerId: "firebase"
   reloadListener: userInfo => {…}
   reloadUserInfo: null
   stsTokenManager: StsTokenManager {refreshToken: 'AIwUaOntjUf1hoxrpkPprcc5qVAkLIjpNqay5vEJEPVCccUYWP…8amVO5WnAXFXbtSEuqHlTpTn7Uul4k7O5s586Dw19YNDTv5ZA', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5N2Q3ZmI1ZGNkZThjZD…pQ7E6LwIY9NwETpGAGZ2qIJGl1Icn3Kxu_TZh9MdpVNftbBuA', expirationTime: 1652753522621}
   tenantId: null
   uid: "6cDIUevJv1Qv8FpGh9tiKo8mzCM2" **/

  async createUserWithEmailAndPassword(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password).then(cred => {
      console.log('cred', cred);
      const newUser =  new User();

      if(cred) {
        if(cred.user?.email) {
          newUser.email = cred.user?.email;
        }

        this.db.collection('users').doc(cred.user?.uid).set(newUser);
      }
    }, err => console.log('Error. Could not create User.', err));
  }

  async sendPasswordResetEmail(email: string) {
    return await this.afAuth.sendPasswordResetEmail(email);
  }

  signInWithPopup() {
    return this.afAuth.signInWithPopup(new firebaseAuth.GoogleAuthProvider());
  }
}
