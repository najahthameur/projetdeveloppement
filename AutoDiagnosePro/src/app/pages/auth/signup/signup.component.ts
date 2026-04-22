import { Component,ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router, 
     private apiService: ApiService,  
       private snackBar: MatSnackBar

  ) {
    this.signupForm = this.fb.group({
      role: ['client', Validators.required],
      nom: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-ZÀ-ÿ\\s]+$")]],
      Nomgarage: ['', [Validators.required,Validators.minLength(3),Validators.pattern("^(?=.*[a-zA-ZÀ-ÿ])[a-zA-ZÀ-ÿ0-9'&-\\s]{3,}$")]],
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('motdepasse')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass && confirm && pass === confirm ? null : { passwordMismatch: true };
  }

  onSubmit(): void {

  if (this.signupForm.invalid) {
    this.signupForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  this.errorMessage = '';

  const payload = {
    nom: this.signupForm.value.nom,
    email: this.signupForm.value.email,
    motdepasse: this.signupForm.value.motdepasse,
    Nomgarage: this.signupForm.value.Nomgarage,
    role: 'garagiste'
  };

  this.apiService.register(payload).subscribe({
    next: () => {
  this.isSubmitting = false;

  this.snackBar.open('Compte créé avec succès 🎉', 'Fermer', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  });

  this.router.navigate(['/login']);
},
    error: (err) => {
      this.isSubmitting = false;
      this.errorMessage = err?.error?.message || 'Erreur inscription';
    }
  });
}

  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
showToast() {
this.snackBar.open('Compte créé avec succès 🎉', 'Fermer', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
});
}
}
