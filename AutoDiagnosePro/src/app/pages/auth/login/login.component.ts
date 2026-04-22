import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  showPassword  = false;
cin = '';
  motdepasse = '';
  constructor(
    private fb:         FormBuilder,
    private http:       HttpClient,
    private router:     Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // ✅ Aucun validator fixe sur email/motdepasse/cin/nom
    // Les validators sont ajoutés dynamiquement selon le rôle
    this.loginForm = this.fb.group({
      role:       ['client', Validators.required],
      email:      [''],
      motdepasse: [''],
      cin:        [''],
      // nom:        [''],
    });

    // ✅ Écouter le changement de rôle pour mettre à jour les validators
    this.loginForm.get('role')!.valueChanges.subscribe(role => {
      this.updateValidators(role);
    });

    // ✅ Appliquer les validators initiaux (rôle = 'client' par défaut)
    this.updateValidators('client');
  }

  // ── Met à jour les validators selon le rôle sélectionné ──
  updateValidators(role: string): void {
    const email      = this.loginForm.get('email')!;
    const motdepasse = this.loginForm.get('motdepasse')!;
    const cin        = this.loginForm.get('cin')!;
    // const nom        = this.loginForm.get('nom')!;

    if (role === 'client') {
      // Client → CIN + Nom obligatoires, email/mdp libres
      cin.setValidators([Validators.required, Validators.pattern('^[0-9]{8}$')]);
  motdepasse.setValidators([Validators.required,Validators.minLength(6)]);
      email.clearValidators();
    } else {
      // Garagiste → email + mdp obligatoires, cin/nom libres
      email.setValidators([Validators.required, Validators.email]);
      motdepasse.setValidators([Validators.required, Validators.minLength(6)]);
      cin.clearValidators();
    //   nom.clearValidators();
    }

    // ✅ Obligatoire après setValidators / clearValidators
    email.updateValueAndValidity();
    motdepasse.updateValueAndValidity();
    cin.updateValueAndValidity();
    // nom.updateValueAndValidity();

    // Réinitialiser les champs de l'autre rôle
    if (role === 'client') {
      email.reset('');
      // motdepasse.reset('');
    } else {
      cin.reset('');
      // nom.reset('');
    }
  }

  onSubmit(): void {
    console.log('CLICK LOGIN');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const form = this.loginForm.value;
    this.isSubmitting = true;
    this.errorMessage = '';

    // ── Construire le payload selon le rôle ──
    let payload: any = { role: form.role };

    if (form.role === 'client') {
      payload.cin = form.cin;
      payload.motdepasse  = form.motdepasse ;
    } else {
      payload.email      = form.email;
      payload.motdepasse = form.motdepasse;
    }

    console.log('PAYLOAD ENVOYÉ =', payload);

    this.apiService.login(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        console.log('RÉPONSE BACKEND =', res);

        localStorage.setItem('token', res.token);
        localStorage.setItem('role',  res.role);
localStorage.setItem("user", JSON.stringify(res.user));        const role = (res.role ?? '').toString().trim().toLowerCase();

        if (role === 'client') {
          this.router.navigate(['/dashboardclient']);
        } else if (role === 'garagiste') {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message || 'Erreur de connexion.';
        console.error('Erreur login', err);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
login() {
    const data = {
      role: 'client',
      cin: this.cin,
      motdepasse: this.motdepasse
    };

    this.apiService.login(data).subscribe((res: any) => {
      console.log(res);

      // 💾 stocker token
      localStorage.setItem('token', res.token);

      alert('Login success');
    });
  }

}

