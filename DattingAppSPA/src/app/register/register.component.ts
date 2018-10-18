import { User } from "./../models/user";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../Services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  model: User = { username: "", password: "" };
  // @Input() valueFromHome: any;
  @Output()
  cancelRegister: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  register() {
    console.log(this.model);
    this._authService.register(this.model).subscribe(
      data => {
        alert("registered successfully;");
        this.cancelRegister.emit(false);
      },
      error => {
        alert("failed to register");
        console.log(error);
      }
    );
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

  //send child value to parent using template variable
  sendChildValue() {
    return false;
  }
}
