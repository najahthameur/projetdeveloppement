import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent  implements OnInit{
  userName     = '';
  lastName = '';
  firstName = '';
  selectedView: string = 'dashboard';
  garageName = 'Garage Central Tunis';
     clients: any[] = [];

  stats = {
    totalInterventions: 7,
    enCours: 1,
    totalDepense: 840,
    facturePending: true,
    joursAvantRevision: 45
  };

  interventions = [
    {
      titre: 'Vidange moteur + filtre',
      meta: 'Peugeot 208 · TN 112 233',
      progres: 30,
      statut: 'En cours',
      couleur: 'blue'
    },
    {
      titre: 'Remplacement plaquettes',
      meta: 'Peugeot 208 · 09/03/2025 · 180 DT',
      progres: 100,
      statut: 'Terminé',
      couleur: 'green'
    },
    {
      titre: 'Révision 40 000 km',
      meta: 'Peugeot 208 · 25/04/2025',
      progres: 0,
      statut: 'Planifié',
      couleur: 'orange'
    }
  ];

  constructor(private router: Router,private apiService: ApiService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

  if (!userData) {
    console.log("❌ Aucun user trouvé dans localStorage");
    this.userName = 'Client';
    return;
  }

  const user = JSON.parse(userData);

  console.log("✅ USER RECUPERE =", user);

  // 👇 gestion flexible selon backend
  // this.userName =
  //   (user.prenom ? user.prenom : '') +
  //   ' ' +
  //   (user.nom ? user.nom : '');

  // this.userName = this.userName.trim() || 'Client';
  this.userName = user.prenom || '';
this.lastName = user.nom || 'Client';
this.firstName = user.prenom || '';
this.lastName = user.nom || '';
    // this.loadClients();
      this.loadVoitures();


}
voitures: any[] = [];

loadVoitures() {
  this.apiService.getMyVoitures().subscribe({
    next: (data) => {
      this.voitures = data;
      console.log("🚗 voitures client =", data);
    },
    error: (err) => {
      console.log("❌ erreur voitures =", err);
    }
  });
}

  // loadClients() {
  //   this.apiService.getClients().subscribe({
  //     next: (data: any) => {
  //       this.clients = data;
  //       console.log("CLIENTS =", data);
  //     },
  //     error: (err) => {
  //       console.log("ERREUR =", err);
  //     }
  //   });
  // }

  badgeClass(status: string): string {
    switch (status) {
      case 'En cours': return 'badge-blue';
      case 'Terminé': return 'badge-green';
      case 'Planifié': return 'badge-orange';
      default: return 'badge-gray';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  isMenuOpen = false;

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

goToProfile() {
  this.router.navigate(['/modifierprofil']);
}

goToPassword() {
  this.router.navigate(['/modifiermotdepasse']);
}
goToVehicules() {
  this.router.navigate(['/mes-vehicules']);
}
}
