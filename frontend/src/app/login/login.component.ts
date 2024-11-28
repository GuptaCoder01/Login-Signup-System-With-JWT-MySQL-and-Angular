import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoginMode = true;

  validation_message = {
    'UserLoginName': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid Email ID' },
      { type: 'domainError', message: 'Email must end with @domain.com' }
    ],
    'UserPassword': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' }
    ],
  }

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  // ye humko login aur signup ko yek hi form pe krne ke liye shakti deta hai
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'UserLoginName': ['', [Validators.required, Validators.email, Validators.pattern, this.domainValidator()
      ]],
      'UserPassword': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter to access form controls
  get loginControls() {
    return this.loginForm.controls;
  }

  domainValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      const domainPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (email && !domainPattern.test(email)) {
        return { domainError: 'Please enter a valid email with a domain (e.g., @domain.com)' };
      }
      return null;
    };
  }

  loginUser() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.UserLoginName;
      const password = this.loginForm.value.UserPassword;

      if (this.isLoginMode) {
        this.authService.login({ email, password }).subscribe(
          (isLoggedIn) => {
            if (isLoggedIn.token) {
              localStorage.setItem('authToken', isLoggedIn.token);
              this.router.navigateByUrl('/dashboard');
            } else {
              alert('Invalid username or password');
            }
          },
          (error) => {
            alert('Invalid Email or Password. Please try again.');
          }
        );
      } else {
        // Signup Logic
        this.authService.register({ email, password }).subscribe(
          response => {
            alert('Signup successful! Please login.');
            this.toggleMode();
          },
          error => {
            alert(error.error.message || 'Signup failed. Please try again.');
          }
        );
      }
    }
  }
}
