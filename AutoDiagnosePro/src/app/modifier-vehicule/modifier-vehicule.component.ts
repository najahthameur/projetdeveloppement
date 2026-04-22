import { Component , OnInit  } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-modifier-vehicule',
  templateUrl: './modifier-vehicule.component.html',
  styleUrls: ['./modifier-vehicule.component.css']
})
export class ModifierVehiculeComponent implements OnInit {

  vehicule: any;
  id!: string;
constructor(
   
    private api: ApiService,
        private route: ActivatedRoute,

    private router: Router
  ) {}
 ngOnInit(): void {
  // ✅ récupérer ID depuis URL
   this.id = this.route.snapshot.params['id'];
    console.log("🔍 ID voiture =", this.id);
    // ✅ charger véhicule
    this.api.getVoitureById(this.id).subscribe({
      next: (data) => {
        console.log("✅ Véhicule chargé =", data);
        this.vehicule = data;
      },
      error: (err) => {
        console.error("❌ Erreur chargement véhicule =", err);
        alert("Erreur chargement véhicule : " + (err.error?.message || err.message));
      }
    });



// ✅ récupérer user depuis localStorage
    const userData = localStorage.getItem('user');
  
    if (!userData) {
     
      console.log("❌ Aucun user trouvé dans localStorage");
     this.firstName = '';
      this.lastName = 'garagiste';
      this.userFullName = 'garagiste';
      return;
    }
  
    const user = JSON.parse(userData);
  
    console.log("✅ USER RECUPERE =", user);
  
     this.firstName = user.prenom || '';
    this.lastName = user.nom || 'garagiste';
      this.userFullName = `${this.firstName} ${this.lastName}`.trim();
 }    
  
    
  
   updateVehicule() {
     if (!this.vehicule) {
      alert("Véhicule non chargé ❌");
      return;
    }
    const updatedData = {
      etat: this.vehicule.etat,
      diagnostic: this.vehicule.diagnostic

    };

    this.api.updateVoiture(this.id, updatedData).subscribe({
    next: (res) => {
        console.log("✅ Modifié =", res);
        alert("Véhicule modifié avec succès ✅");
        this.router.navigate(['/listevehicules']);
    },
     error: (err) => {
        console.error("❌ Erreur modification =", err);
        console.error("❌ Status =", err.status);
        console.error("❌ Message =", err.error?.message);
        alert("Erreur : " + (err.error?.message || "Erreur serveur ❌"));
      }
  });

  }

  cancel() {
    this.router.navigate(['/listevehicules']);
  }
  userName     = '';
  firstName = '';
  userFullName = '';
  lastName = '';

  logout() {
      localStorage.clear();
      this.router.navigate(['/login']);
    }

    goToModifierCompte() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const id = user?._id || user?.id;

  if (id) {
    this.router.navigate(['/modifiercompte', id]);
  }
}
user: any = null;

showConfirmDelete = false;

ouvrirConfirmDelete() {
  this.showConfirmDelete = true;
}

annulerDelete() {
  this.showConfirmDelete = false;
}

// supprimerCompte() {

//   const storedUser = localStorage.getItem('user');

//   if (!storedUser) {
//     alert("Utilisateur introuvable ❌");
//     return;
//   }

//   const user = JSON.parse(storedUser);

//   const id = user._id || user.id;

//   console.log("🗑 ID envoyé API =", id);

//   if (!id) {
//     alert("ID utilisateur invalide ❌");
//     return;
//   }

//   this.apiService.deleteUser(id).subscribe({
//     next: () => {
//       alert("Compte supprimé ✅");
//       localStorage.removeItem('user');
//       this.router.navigate(['/signup']);
//     },
//     error: (err) => {
//       console.error("❌ Backend error =", err);
//       alert("Erreur suppression ❌");
//     }
//   });
// }
confirmerDelete() {

  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    alert("Utilisateur introuvable ❌");
    return;
  }

  const user = JSON.parse(storedUser);
  const id = user._id || user.id;

  console.log("🗑 ID envoyé API =", id);

  if (!id) {
    alert("ID utilisateur invalide ❌");
    return;
  }

  this.api.deleteUser(id).subscribe({
    next: () => {
      this.showConfirmDelete = false;

      alert("Compte supprimé avec succès ✅");

      localStorage.removeItem('user');
      this.router.navigate(['/signup']);
    },
    error: (err) => {
      console.error("❌ Backend error =", err);
      alert("Erreur suppression ❌");
    }
  });
}
}

