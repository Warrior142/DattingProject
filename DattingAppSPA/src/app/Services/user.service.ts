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
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${Constant.baseUrl + "Users/"}`, Constant.jwtHeaders())
      .pipe(
        map(data => {
          //console.log(data);
          return <User[]>data;
        }),
        catchError(this.handleError)
      );
  }

  getUsersById(id: number): Observable<User> {
    return this.httpClient
      .get<User>(`${Constant.baseUrl + "Users/"}/${id}`, Constant.jwtHeaders())
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error("Client Side Error:", errorResponse.error.message);
    } else {
      console.error("Server Side Error:", errorResponse);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
