import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modifier-motdepasse',
  templateUrl: './modifier-motdepasse.component.html',
  styleUrls: ['./modifier-motdepasse.component.css']
})
export class ModifierMotdepasseComponent {
  user: any;
 firstName = '';
  lastName = '';
      selectedView: string = 'dashboard';

  garageName = 'Mon Garage';
   isMenuOpen = false;

  stats = {
    totalInterventions: 0,
    enCours: 0,
    totalDepense: 0,
    joursAvantRevision: 10
  };

  interventions: any[] = [];
ancienPassword = '';
  nouveauPassword = '';
  confirmPassword = '';

 constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
     const data = localStorage.getItem('user');

    if (data) {
      this.user = JSON.parse(data);
     

      this.firstName = this.user.nom || '';
      this.lastName = this.user.prenom || '';
      
    }
  
    if (data) {
      this.user = JSON.parse(data);
    }
  }
   changerMotDePasse() {

    if (this.nouveauPassword !== this.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas");
      return;
    }

    this.http.put(
      `http://localhost:3000/api/changepassword/${this.user._id}`,
      {
         ancienPassword: this.ancienPassword,
      nouveauPassword: this.nouveauPassword,
      confirmPassword: this.confirmPassword
      }
    ).subscribe({
      next: (res: any) => {
        alert("✅ Mot de passe modifié avec succès");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert("❌ Erreur modification mot de passe");
      }
    });
  }

cancel() {
  this.ancienPassword = '';
  this.nouveauPassword = '';
  this.confirmPassword = '';
}  
   toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToProfile() {
    this.router.navigate(['/modifierprofil']);
  }

  goToPassword() {
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

