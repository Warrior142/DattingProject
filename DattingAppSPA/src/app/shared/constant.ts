import { HttpHeaders } from "@angular/common/http";

export class Constant {
  public static baseUrl = "https://localhost:5001/api/";
  public static httpHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  public static jwtHeaders() {
    let token = localStorage.getItem("token");
    if (token) {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        })
      };
    }
  }
}
