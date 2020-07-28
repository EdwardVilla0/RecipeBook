import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface AuthResposeData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expireIn: string;
  localId: string;
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
    );
  }
}
