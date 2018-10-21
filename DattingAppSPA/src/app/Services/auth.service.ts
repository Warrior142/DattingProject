import { User } from "./../models/user";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Constant } from "../shared/constant";
import { catchError, map } from "rxjs/operators";
import { JwtHelperService} from "@auth0/angular-jwt";

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
        }),
        catchError(this.handleError)
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
        }),
        catchError(this.handleError)
      );
  }

  logeedIn() {
    const token = this.userToken ? this.userToken : null;
    return this.jwtHelper.isTokenExpired() ? false : true;
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error("Client Side Error:", errorResponse.error.message);
    } else {
      console.error("Server Side Error:", errorResponse);
    }
    return throwError("Something bad happened; please try again later.");
  }
  // private handleError(error: HttpErrorResponse) {
  //   const applicationError = error.headers.get("Application-Error");
  //   if (applicationError) {
  //     return throwError(applicationError);
  //   }
  //   const serverError = error;
  //   let modelStateErrors = "";
  //   if (serverError) {
  //     for (const key in serverError) {
  //       if (serverError[key]) {
  //         modelStateErrors += serverError[key] + "\n";
  //       }
  //     }
  //   }
  //   return throwError(modelStateErrors || "Server error");
  // }
}
