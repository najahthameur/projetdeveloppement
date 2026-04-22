import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute,Router  } from '@angular/router';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {
 cin!: string;
voitures: any[] = [];
userName     = '';
firstName = '';
userFullName = '';
lastName = '';
currentPage: number = 1;
itemsPerPage: number = 5;
   constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
     private router: Router
  ) {}
   ngOnInit(): void {
    this.cin = this.route.snapshot.paramMap.get('cin')!;

    this.loadVoitures();

    ///pour affiche le nom de userconnect
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
  
  loadVoitures() {
    this.apiService.getVoituresByCin(this.cin)
      .subscribe({
        next: (data) => {
          this.voitures = data;
        },
        error: (err) => {
          console.log("Erreur chargement voitures", err);
        }
      });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
 // ✅ PAGINATION VOITURES
  get paginatedVoitures() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.voitures.slice(start, end);
  }
changePage(page: number) {
  this.currentPage = page;
}
  get totalPages(): number[] {
    const total = Math.ceil(this.voitures.length / this.itemsPerPage);
    return Array(total).fill(0).map((_, i) => i + 1);
  }
  goBackToClients() {
  this.router.navigate(['/afficherclient']);
}
goToAddVoiture() {
  this.router.navigate(['/ajoutervoiture', this.cin]);
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
