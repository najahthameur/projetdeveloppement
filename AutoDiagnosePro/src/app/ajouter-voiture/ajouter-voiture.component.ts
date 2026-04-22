import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ajouter-voiture',
  templateUrl: './ajouter-voiture.component.html',
  styleUrls: ['./ajouter-voiture.component.css']
})
export class AjouterVoitureComponent {
// clientId = '';
cin = ''; 
  voiture = {
    marque: '',
    modele: '',
    matricule: '',
    etat: 'en attente'
  };
  constructor(private apiService: ApiService,private router: Router,private route: ActivatedRoute) {}
   ajouterVoiture() {
        if (!this.cin) {
         alert("❌ CIN obligatoire");
           return;
       }
    this.apiService.addVoiture(this.cin, this.voiture)
      .subscribe({
        next: (res) => {
          console.log('Voiture ajoutée', res);
          alert('Voiture ajoutée avec succès ✅');

          // reset form
          this.voiture = {
            marque: '',
            modele: '',
            matricule: '',
            etat: 'en attente'
          };
                    this.cin = '';
                    // 🔥 REDIRECTION ICI
        this.router.navigate(['/listevehicules']);

        },
      error: (err) => {
        console.error("❌ Erreur =", err);
        alert(err.error?.message || "Erreur ajout voiture ❌");
      }
      });
  }
  userName     = '';
  firstName = '';
  userFullName = '';
  lastName = '';
    client = {
      cin: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      motdepasse: '' 
    };
    clients: any[] = [];
  
    
  ngOnInit(): void {
      const cinParam = this.route.snapshot.paramMap.get('cin');
     if (cinParam) {
    this.cin = cinParam; // ✅ CIN prérempli automatiquement
  }
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

  this.apiService.deleteUser(id).subscribe({
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

