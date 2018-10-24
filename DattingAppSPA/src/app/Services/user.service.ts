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
    return this.httpClient.get<User[]>(`${Constant.baseUrl + "Users/"}`);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${Constant.baseUrl + "Users"}/${id}`);
  }
}
