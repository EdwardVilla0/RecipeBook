import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expireIn: string;
  localId: string;
  resgistered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResposeData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwVD4mUjA73P4RPkxnYT3S8bVAaBU00M4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorRes => {
      let errorMessage = 'an unknown error occured'
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exist';
      }
      return throwError(errorMessage);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResposeData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwVD4mUjA73P4RPkxnYT3S8bVAaBU00M4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }

}
