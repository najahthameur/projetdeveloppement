import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css']
})
export class ModifierProfilComponent {
user: any;
 firstName = '';
  lastName = '';
    
  garageName = 'Mon Garage';
   isMenuOpen = false;

  stats = {
    totalInterventions: 0,
    enCours: 0,
    totalDepense: 0,
    joursAvantRevision: 10
  };

  interventions: any[] = [];

  constructor(private router: Router,
         private apiService: ApiService
  ) {}

  ngOnInit() {
    const data = localStorage.getItem('user');

    if (data) {
      this.user = JSON.parse(data);
     

      this.firstName = this.user.nom || '';
      this.lastName = this.user.prenom || '';
      
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToProfile() {
    this.router.navigate(['/modifierprofil']);
  }

  goToPassword() {
    this.router.navigate(['/modifiermotdepasse']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
   badgeClass(statut: string) {
    if (statut === 'Terminé') return 'badge green';
    if (statut === 'En cours') return 'badge orange';
    return 'badge';
  }
  selectedView: string = 'dashboard';
goToEditProfile() {
  this.router.navigate(['/editprofil', this.user._id]);
}
}
