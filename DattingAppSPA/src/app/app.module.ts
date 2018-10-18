import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EmpComponent } from "./employee/emp.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxSpinnerModule } from "ngx-spinner";
import { NavComponent } from "./nav/nav.component";
import { FormsModule } from "@angular/forms";
import { EmpService } from "./Services/emp.service";
import { AuthService } from "./Services/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { AlertifyService } from "./Services/alertify.service";
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    EmpComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: ["localhost:5001/api/auth/"]
      }
    })
  ],
  providers: [EmpService, AuthService, AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
