import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null; // server-side or async errors
  

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.error = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      // focus first invalid control for accessibility
      setTimeout(() => {
        const el: HTMLElement | null = document.querySelector('.ng-invalid');
        if (el) el.focus();
      }, 50);

      return;
    }

    const { username, password } = this.loginForm.value;
    this.loading = true;

    // Simulated async auth (replace with real AuthService call)
    setTimeout(() => {
      this.loading = false;
      console.log('Login attempt', { username, password });
      // demo behaviour: accept username 'admin' and password 'password'
      if (username === 'admin' && password === 'password') {
        console.log('Login successful (demo)');
        this.error = null;
        // TODO: navigate to dashboard or call AuthService
      } else {
        this.error = 'Invalid credentials (demo). Try admin / password';
      }
    }, 800);
  }

  
}
