import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user.service";
import { AlertifyService } from "src/app/Services/alertify.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(
    private _userService: UserService,
    private Alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadUser();
  }
  loadUser() {
    this._userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        this.Alertify.error(error);
      }
    );
  }
}
