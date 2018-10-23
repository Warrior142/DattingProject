import { User } from "./../models/user";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Constant } from "../shared/constant";
import { catchError, map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userToken: any;
  decodedToken: any;
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  login(model: User): Observable<any> {
    return this.httpClient
      .post<any>(
        `${Constant.baseUrl + "auth/login/"}`,
        model,
        Constant.httpHeaders
      )
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.tokenString) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("token", user.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            this.userToken = user.tokenString;
          }
          return user;
        })
      );
  }

  register(model: User): Observable<any> {
    return this.httpClient
      .post<any>(
        `${Constant.baseUrl + "auth/register/"}`,
        model,
        Constant.httpHeaders
      )
      .pipe(
        map(user => {
          console.log(user);
          return user;
        })
      );
  }

  logeedIn() {
    const token = this.userToken ? this.userToken : null;
    return this.jwtHelper.isTokenExpired() ? false : true;
  }
}
