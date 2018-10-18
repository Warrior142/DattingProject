import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpComponent } from './employee/emp.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { EmpService } from './Services/emp.service';
import { AuthService } from './Services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

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
    FormsModule

  ],
  providers: [EmpService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
