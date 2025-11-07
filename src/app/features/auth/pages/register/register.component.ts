import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (!password || !confirm) return null;
  return password.value === confirm.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      agree: [false]
    }, { validators: passwordMatchValidator });

    // no live clientErrors summary — per-field messages kept for screen readers only
  }

  get f(): any {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.error = null;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      setTimeout(() => {
        const el: HTMLElement | null = document.querySelector('.ng-invalid');
        if (el) el.focus();
      }, 50);

      return;
    }

    this.loading = true;
    const { fullName, email, password } = this.registerForm.value;

    // Simulate registration call
    setTimeout(() => {
      this.loading = false;
      console.log('Register', { fullName, email });
      // demo success
      // TODO: call AuthService.register and navigate to login or dashboard
    }, 900);
  }
}
