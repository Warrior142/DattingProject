import { NgxSpinnerModule } from "ngx-spinner";
import { Emp } from "./../models/emp.model";
import { EmpService } from "./../Services/emp.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-emp",
  templateUrl: "./emp.component.html",
  styleUrls: ["./emp.component.css"]
})
export class EmpComponent implements OnInit {
  employeesList: Emp[];
  employee: Emp = { job: "study", name: "kamal"};

  empId: number = 2;
  constructor(
    private _empService: EmpService,
    private spinner: NgxSpinnerModule
  ) {}

  ngOnInit() {
      this.getEmployees();
    // this.getEmployeeById();
    //this.deleteEmployee();
    //this.updateEmployee();
    //this.saveEmployee();
  }
  getEmployees() {
    this._empService
      .getEmployees()
      .subscribe(
        empList => (
          (this.employeesList = empList), (error: any) => console.log(error)
        )
      );
  }
  getEmployeeById() {
    this._empService
      .getEmployeeById(this.empId)
      .subscribe(
        emp => (this.employee = emp),
        (error: any) => console.log(error)
      );
  }
  deleteEmployee() {
    debugger;
    this._empService.deleteEmployee(this.empId).subscribe(
      (data: void) => {
        console.log(data);
        alert(`Employee with ID = ${this.empId} Deleted`);
      },
      (error: any) => console.log(error)
    );
  }
  updateEmployee() {
    this._empService.updateEmployee(this.employee).subscribe(
      (data: void) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
  }
  saveEmployee() {
    this._empService.saveEmployee(this.employee).subscribe(
      (data: void) => {
        console.log(data);
      },
      (error: any) => console.log(error)
    );
  }
}
