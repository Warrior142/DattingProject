import { HttpHeaders } from "@angular/common/http";

export class Constant {
  public static baseUrl = "https://localhost:5001/api/values/";
  public static httpHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
}