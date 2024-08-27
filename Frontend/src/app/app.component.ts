import { Component } from '@angular/core';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestsTableComponent } from "../Admin-Dashboard/requests-table/requests-table.component";
import { NavbarComponent } from "../Admin-Dashboard/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  imports: [LoginComponent, SignupComponent, FooterComponent, HeaderComponent, ReactiveFormsModule, CommonModule, RequestsTableComponent, NavbarComponent],
})
export class AppComponent {
  isLogin: boolean = true; // Initially show login form
  isLogged: boolean = false; // Initially not logged in

  onSignIn() {
    this.isLogin = false;
    this.isLogged = true; // Show sign-up component
  }

  onBackToLogin() {
    this.isLogin = true;
    this.isLogged = false; // Show login component
  }
}
