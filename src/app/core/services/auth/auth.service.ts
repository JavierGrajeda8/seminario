import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ConstStrings } from '../../constants/constStrings';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public uid = '';
  public email = '';
  public name = '';
  constructor(
    public angularFireAuth: AngularFireAuth,
    private storage: StorageService
  ) {}

  loginWithEmailPassword(email: string, password: string) {
    const usrAux: User = { email, password, uid: '' };
    return new Promise((resolve, reject) => {
      this.angularFireAuth
        .signInWithEmailAndPassword(usrAux.email, usrAux.password!)
        .then((success: any) => {
          usrAux.uid = success.user.uid;
          usrAux.logginType = 'email';
          resolve('');
        })
        .catch((error: any) => {
          reject(error.code);
        });
    });
  }

  public registerWithEmail(email: string, password: string): Promise<any> {
    return new Promise((resolve0, reject) => {
      this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result: any) => {
          resolve0(result);
        });
    });
  }

  public register3(context: any, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((response: any) => {
          this.uid = response.user.uid;
          this.name = response.user.displayName;
          this.email = response.user.email;
          const usr: User = {
            name: response.user.displayName,
            uid: response.user.uid,
            email: response.user.email,
            logginType: 'email',
          };
          // console.log(usr);
          resolve(usr);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public isLogged(): Observable<any> {
    // console.log('CurrentUser', this.angularFireAuth.auth);
    return this.angularFireAuth.authState;
  }

  // public getUID(): Promise<any> {
  //   return new Promise((resolve0, reject) => {
  //     const unsubscribe = auth().onAuthStateChanged((user) => {
  //       unsubscribe();
  //       resolve0(user);
  //     }, reject);
  //   });
  // }

  public logOut() {
    return new Promise((resolve, reject) => {
      this.angularFireAuth
        .signOut()
        .then(() => {
          // this.storage.remove(ConstStrings.str.storage.user).then(() => {
          //   resolve('');
          // });
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
