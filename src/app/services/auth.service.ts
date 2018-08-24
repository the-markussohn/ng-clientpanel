import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private _fireAuth: AngularFireAuth) {
  }

  login(email: string, password: string) {
    return new Promise((resolved, rejected) => {
      this._fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolved(userData),
          err => rejected(err));
    });
  }

  logout() {
    this._fireAuth.auth.signOut();
  }

  getAuth() {
    return this._fireAuth.authState.pipe(
      map(auth => auth)
    );
  }

  register(email: string, password: string) {
    return new Promise((resolved, rejected) => {
      this._fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolved(userData),
          err => rejected(err));
    });

  }
}
