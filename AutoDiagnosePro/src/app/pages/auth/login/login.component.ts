import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      role: ['client', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = this.loginForm.value;

    // À adapter avec l'URL de ton backend Node.js
    this.http.post('http://localhost:3000/api/auth/login', payload)
      .subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          // TODO: stocker le token / naviguer vers une autre page
          console.log('Login success', res);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err?.error?.message || 'Erreur de connexion.';
        }
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

