import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-affiche-vehicule',
  templateUrl: './affiche-vehicule.component.html',
  styleUrls: ['./affiche-vehicule.component.css']
})
export class AfficheVehiculeComponent implements OnInit  {
   voitures: any[] = [];
  filteredVoitures: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  lastName = '';
userName     = '';
firstName = '';
userFullName = '';
  vehicules: any[] = [];

searchMatricule: string = '';
searchClient: string = '';
clients: any[] = [];
selectedClientCin: string = '';
showConfirmVehiculeDelete = false;
vehiculeToDeleteId: string | null = null;
  constructor(private router: Router,private apiService: ApiService) {}

   ngOnInit(): void {
    

    ///pour affiche le nom de userconnect
 const userData = localStorage.getItem('user');

  if (userData) {
    this.user = JSON.parse(userData);

    this.firstName = this.user.prenom || '';
    this.lastName = this.user.nom || 'garagiste';
    this.userFullName = `${this.firstName} ${this.lastName}`.trim();

    console.log("✅ USER RECUPERE =", this.user);

  } else {
    console.log("❌ Aucun user trouvé dans localStorage");

    this.user = null;
    this.firstName = '';
    this.lastName = 'garagiste';
    this.userFullName = 'garagiste';
  }

  this.loadVoitures();
  this.getAllVehicules();
  this.getAllClients();
  }
   getAllClients() {
  this.apiService.getClients().subscribe({
    next: (data) => {
      this.clients = data;
    },
    error: (err) => console.log(err)
  });
}
  getAllVehicules() {
    this.apiService.getVoitures().subscribe((data) => {
      this.vehicules = data;
    });
  }
  deleteVehicule(id: string) {
 if (confirm("❌ Voulez-vous vraiment supprimer ce véhicule ?")) {

    this.apiService.deleteVoiture(id).subscribe({
        next: () => {
          this.voitures = this.voitures.filter(v => v._id !== id);
          this.filteredVoitures = this.filteredVoitures.filter(v => v._id !== id);
          alert("✅ Supprimé avec succès");
        },
        error: (err) => {
          alert("Erreur suppression ❌");
        }
      });

  }
}

  
  loadVoitures() {
  
    this.apiService.getVoitures().subscribe({
      next: (data) => {
        this.voitures = data.reverse();
        this.filteredVoitures = this.voitures;
      },
      error: (err) => {
        console.log('Erreur chargement voitures', err);
      }
    });
  }

  // pagination
  get paginatedVoitures() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredVoitures.slice(start, end);
  }

   get totalPages(): number[] {
    const total = Math.ceil(this.filteredVoitures.length / this.itemsPerPage);
    return Array(total).fill(0).map((_, i) => i + 1);
  }

   changePage(page: number) {
    this.currentPage = page;
  }
   goToEdit(id: string) {
  this.router.navigate(['/modifiervehicule', id]);
}
  reload() {
    window.location.reload(); // simple test
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
 
applyFilters() {

  this.filteredVoitures = this.voitures.filter(v => {

    const matchMatricule =
      !this.searchMatricule ||
      v.matricule?.toLowerCase().includes(this.searchMatricule.toLowerCase());

    const matchClient =
      !this.selectedClientCin ||
      v.cin === this.selectedClientCin;

    return matchMatricule && matchClient;
  });

  this.currentPage = 1;
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
