import { AlertifyService } from "./../Services/alertify.service";
import { AuthService } from "./../Services/auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private alertify: AlertifyService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.logeedIn()) {
      return true;
    }
    this.alertify.error("You need to be logged in to access this area");
    this._router.navigate(["/home"]);
    return false;
  }
}
