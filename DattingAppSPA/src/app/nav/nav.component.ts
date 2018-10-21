import { Router } from "@angular/router";
import { User } from "./../models/user";
import { AuthService } from "./../Services/auth.service";
import { Component, OnInit } from "@angular/core";
import { AlertifyService } from "../Services/alertify.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  user: any = {};
  constructor(
    public _authService: AuthService,
    private Alertify: AlertifyService,
    private _router: Router
  ) {}

  ngOnInit() {}

  login() {
    if (this.user == null) {
      alert("model is null");
      return false;
    }
    this._authService.login(this.user).subscribe(
      data => {
        this.Alertify.success("logged in successfully;");
      },
      error => {
        this.Alertify.error("failed to login");
        console.log(error);
      },
      () => {
        this._router.navigate(["/members"]);
      }
    );
  }
  loggedIn() {
    return this._authService.logeedIn();
  }
  logout() {
    this._authService.userToken = null;
    localStorage.removeItem("token");
    this.Alertify.message("loggedout");
    this.user.username = "";
    this.user.password = "";
    this._router.navigate(["/home"]);
  }
}
