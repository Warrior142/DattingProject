import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "./Services/auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Datting App";
  constructor(
    private spinner: NgxSpinnerService,
    private jwtHelper: JwtHelperService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    /** spinner starts on init */
    // this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      //   this.spinner.hide();
    }, 5000);
  }
}
