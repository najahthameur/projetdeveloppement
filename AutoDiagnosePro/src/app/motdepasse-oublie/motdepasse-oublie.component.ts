import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-motdepasse-oublie',
  templateUrl: './motdepasse-oublie.component.html',
  styleUrls: ['./motdepasse-oublie.component.css']
})
export class MotdepasseOublieComponent {
form: FormGroup;
  step = 1;
  token = '';
  message = '';
showPassword  = false;   // ← ajouté pour le toggle 👁
  isSubmitting  = false;   // ← désactive les boutons pendant les appels
  showAlert     = false;
  countdown     = 5;
    private countdownInterval: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {

    this.form = this.fb.group({
      role: ['client', Validators.required],
      email: [''],
      cin: [''],
      newPassword: ['']
    });

    // changement dynamique
    this.form.get('role')?.valueChanges.subscribe(role => {
      this.updateValidators(role);
            this.message = '';

    });

    this.updateValidators('client');
  }

  updateValidators(role: string) {
    const email = this.form.get('email')!;
    const cin = this.form.get('cin')!;

    if (role === 'client') {
      cin.setValidators([Validators.required, Validators.pattern('^[0-9]{8}$')]);
      email.clearValidators();
            email.reset('');

    } else {
      email.setValidators([Validators.required, Validators.email]);
      cin.clearValidators();
            cin.reset('');

    }

    cin.updateValueAndValidity();
    email.updateValueAndValidity();
  }

  // 🔐 STEP 1
  sendCode(): void {
    if (this.form.invalid || this.isSubmitting) return;
 
    const role = this.form.value.role;
    const payload: any = { role };
 
    if (role === 'client') {
      payload.cin = this.form.value.cin;
    } else {
      payload.email = this.form.value.email;
    }
 
    this.isSubmitting = true;
    this.message      = '';
 
    this.api.forgotPassword(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.token        = res.token;
        this.step         = 2;
        this.message      = 'Code envoyé ✔';
 
        // Ajouter le validator sur newPassword maintenant qu'on est au step 2
        this.form.get('newPassword')!.setValidators([
          Validators.required,
          Validators.minLength(6)
        ]);
        this.form.get('newPassword')!.updateValueAndValidity();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.message      = err?.error?.message || 'Identifiant introuvable.';
      }
    });
  }

  // 🔐 STEP 2
  resetPassword(): void {
    if (this.form.get('newPassword')?.invalid || this.isSubmitting) return;
 
    const data = {
      token:       this.token,
      role:        this.form.value.role,
      newPassword: this.form.value.newPassword
    };
 
    this.isSubmitting = true;
    this.message      = '';
 
    this.api.resetPassword(data).subscribe({
     next: () => {
  this.isSubmitting = false;
  this.message = 'Mot de passe modifié avec succès ✔';

  // 👉 AFFICHER ALERT
  this.openSuccessAlert();
},
      error: (err) => {
        this.isSubmitting = false;
        this.message = err?.error?.message || 'Erreur lors de la réinitialisation.';
      }
    });
  }
  // ── Toggle visibilité mot de passe ──
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
   // ── Ouvre la modale + démarre le countdown ──
openSuccessAlert(): void {
  this.showAlert = true;
}
 
  // ── Ferme la modale et redirige ──
  closeAlertAndRedirect(): void {
  this.showAlert = false;
  this.router.navigate(['/login']);
}
closeAlert(): void {
  this.showAlert = false;
}
 
  // ── Clic sur l'overlay (hors boîte) ferme aussi ──
  onOverlayClick(event: MouseEvent): void {
    const box = document.getElementById('alertBox');
    if (box && !box.contains(event.target as Node)) {
      this.closeAlertAndRedirect();
    }
  }
 
  
 
  


}