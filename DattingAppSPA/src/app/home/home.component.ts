import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  values: any[] = [
    { id: 1001, name: "Value1001" },
    { id: 1001, name: "value1002" },
    { id: 1001, name: "value1003" }
  ];
  constructor() {}

  ngOnInit() {
    //this.getValues();
  }
  registerToggle() {
    this.registerMode = true;
  }

  //@input example
  // getValues() {
  //   return this.values;
  // }
  cancelRegisterMode(registerMode: any) {
    this.registerMode = registerMode;
  }
}
