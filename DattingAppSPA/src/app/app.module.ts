import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TabsModule } from 'ngx-bootstrap';
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

import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./guards/auth.guard";
import { UserService } from "./Services/user.service";
import { ErrorInterceptorProvider } from "./Services/error.interceptor";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailResolver } from "./_resolvers/member-details.resolver";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { NgxGalleryModule } from 'ngx-gallery';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    EmpComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: ["localhost:5001/api/auth/"]
      }
    })
  ],
  providers: [EmpService, AuthService, AlertifyService, AuthGuard,UserService,ErrorInterceptorProvider,MemberDetailResolver,MemberListResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
