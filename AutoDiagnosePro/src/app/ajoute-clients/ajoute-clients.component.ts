import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ AJOUTER ICI
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-ajoute-clients',
  templateUrl: './ajoute-clients.component.html',
  styleUrls: ['./ajoute-clients.component.css']
})
export class AjouteClientsComponent {
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

  constructor(private http: HttpClient,private router: Router,private api: ApiService) {}
ngOnInit(): void {
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
ajouterClient() {
 console.log('Client ajouté:', this.client);
//   alert(`Client ${this.client.nom} ${this.client.prenom} ajouté !`);
//   // Ici tu peux appeler ton service pour enregistrer le client dans la DB
//   this.client = { nom: '', prenom: '', email: '', telephone: '', adresse: '' }; // réinitialise le formulaire
   // ✅ récupérer token depuis localStorage
    // const token = localStorage.getItem('token');

    // // ✅ créer headers correctement
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`,
    //   'Content-Type': 'application/json'
    // });
    // ✅ utilise le service avec token automatique
    this.api.addClient(this.client).subscribe({
      next: (res) => {
        console.log("✅ Client ajouté:", res);
        alert("Client ajouté ✅");
        this.client = {
          cin: '', nom: '', prenom: '',
          email: '', telephone: '',
          adresse: '', motdepasse: ''
        };
        this.router.navigate(['/afficherclient']);
      },
      error: (err) => {
        console.error("❌ Erreur:", err);
        alert(err.error?.message || "Erreur serveur ❌");
      }
    });

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
