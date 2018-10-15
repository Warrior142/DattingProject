import { Emp } from "./../models/emp.model";
import { Constant } from "./../shared/constant";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class EmpService {
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<Emp[]> {
    return this.httpClient
      .get<Emp[]>(Constant.baseUrl + "GetValues")
      .pipe(catchError(this.handleError));
  }

  getEmployeeById(id: number): Observable<Emp> {
    return this.httpClient
      .get<Emp>(
        `${Constant.baseUrl + "GetValuesById"}/${id}`,
        Constant.httpHeaders
      )
      .pipe(catchError(this.handleError));
  }
  deleteEmployee(id: number): Observable<void> {
    debugger;
    // const newurl = `${url}?id=${id}`; // DELETE api/contact?id=42
    return this.httpClient
      .delete<void>(
        `${Constant.baseUrl + "deleteEmployee"}/${id}`,
        Constant.httpHeaders
      )
      .pipe(catchError(this.handleError));
  }

  saveEmployee(employee: Emp): Observable<void> {
    return this.httpClient
      .post<void>(
        `${Constant.baseUrl+"PostEmployees"}`,
        employee,
        Constant.httpHeaders
      )
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Emp): Observable<void> {
    return this.httpClient
      .put<void>(
        `${Constant.baseUrl+"UpdateEmployees"}`,
        JSON.stringify(employee),
        Constant.httpHeaders
      )
      .pipe(catchError(this.handleError));
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
