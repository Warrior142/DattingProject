import { User } from "./../models/user";
import { AuthService } from "./../Services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  user: User = {
    username: "",
    password: ""
  };
  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  login() {
    debugger;
    if (this.user == null) {
      alert("model is null");
      return false;
    }
    this._authService.login(this.user).subscribe(
      data => {
        console.log("logged in successfully;");
      },
      error => {
        alert("failed to login");
      }
    );
  }
  loggedIn() {
    const token = localStorage.getItem("token");
    return !!token;
  }
  logout() {
    this._authService.userToken = null;
    localStorage.removeItem("token");
    console.log("loggedout");
    this.user.username = "";
    this.user.password = "";
  }
}
