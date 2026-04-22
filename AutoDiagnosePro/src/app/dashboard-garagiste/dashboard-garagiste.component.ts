import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-dashboard-garagiste',
  templateUrl: './dashboard-garagiste.component.html',
  styleUrls: ['./dashboard-garagiste.component.css'],
 

})
export class DashboardGaragisteComponent implements OnInit {
firstName = '';
 user: any;
userFullName = '';
lastName = '';
  userName     = '';
  userInitials = '';
  garageName   = '';
  constructor(private router: Router,private api: ApiService) {}

  ngOnInit(): void {
  const userData = localStorage.getItem('user');

  if (!userData) {
    console.log("❌ Aucun user trouvé dans localStorage");
   this.firstName = '';
    this.lastName = 'garagiste';
    // this.userFullName = 'garagiste';
    return;
  }

  this.user = JSON.parse(userData);

  console.log("✅ USER RECUPERE =", this.user);

   this.firstName = this.user.prenom || '';
  this.lastName = this.user.nom || 'garagiste';
    this.userFullName = `${this.firstName} ${this.lastName}`.trim();

}
  goToClients() {
    this.router.navigate(['/afficherclient']);
  }

 goToAjouterClient() {
    this.router.navigate(['/ajouterclient']); 
  }
  goToVoitures() {
  this.router.navigate(['/listevehicules']);
}
logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }



  goToModifierCompte() {
  if (this.user?._id) {
    this.router.navigate(['/modifiercompte', this.user._id]);
  } else {
    // fallback si _id absent, essayer avec id
    const id = this.user?.id || this.user?._id;
    this.router.navigate(['/modifiercompte', id]);
  }
}
showConfirmDelete = false;

ouvrirConfirmDelete() {
  this.showConfirmDelete = true;
}

annulerDelete() {
  this.showConfirmDelete = false;
}

supprimerCompte() {


  
    // 🔍 Vérifier l'ID disponible
  const id = this.user?._id || this.user?.id;
  
  console.log("🗑️ ID à supprimer =", id);
  console.log("👤 User complet =", this.user);

  if (!id) {
    alert("Erreur : ID utilisateur introuvable ❌");
    return;
  }
  this.api.deleteUser(id).subscribe({
     next: (res) => {
      console.log("✅ Suppression réussie =", res);
      alert("Compte supprimé ✅");
      localStorage.clear();
      this.router.navigate(['/signup']);
    },
    error: (err) => {
      console.error("❌ Erreur suppression =", err);
      console.error("Status =", err.status);
      console.error("Message =", err.error);
      alert(`Erreur ${err.status} : ${err.error?.message || 'Suppression échouée'}`);
    }
  });
}
}

