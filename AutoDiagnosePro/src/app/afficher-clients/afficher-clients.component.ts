import { Component,OnInit   } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-afficher-clients',
  templateUrl: './afficher-clients.component.html',
  styleUrls: ['./afficher-clients.component.css']
})
export class AfficherClientsComponent implements OnInit{
  currentPage: number = 1;
itemsPerPage: number = 5;
 clients: any[] = [];
 filters = {
  nom : '',
  email: '',
  telephone: '',
  address: ''
};

 filteredClients: any[] = [];
searchText: string = '';


  constructor(private http: HttpClient,private router: Router,private apiService:ApiService) {}

  ngOnInit(): void {
    this.getClients();


///pour affiche le nom de userconnect
 // ✅ charger user
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

    // ✅ charger clients
    this.loadClients();
  }
  // ✅ méthode centralisée avec token via service
  loadClients() {
    this.apiService.getClients().subscribe({
      next: (data) => {
        console.log("✅ Clients =", data);
        this.clients = data.reverse();
        this.filteredClients = [...this.clients];
      },
      error: (err) => {
        console.error('❌ Erreur chargement clients', err);
        if (err.status === 401) {
          alert("Session expirée, reconnectez-vous");
          this.router.navigate(['/login']);
        }
      }
    });
  }
 getClients() {
  this.http.get<any[]>('http://localhost:3000/api/affclients')
    .subscribe({

      next: (data) => {
                  
        this.clients = data;
        this.filteredClients = data; // important
        this.clients = data.reverse(); // nouveau en haut

      },
      error: (err) => {
        console.log('Erreur chargement clients', err);
      }
    });
     const text = this.searchText.toLowerCase().trim();

  this.filteredClients = this.clients.filter(client => {

    const full = (client.nom + ' ' + client.prenom).toLowerCase();
    const email = (client.email || '').toLowerCase();
    const phone = (client.telephone || '').toLowerCase();
    const address = (client.adresse || '').toLowerCase();

    return (
      full.includes(text) ||
      email.includes(text) ||
      phone.includes(text) ||
      address.includes(text)
    );
  });
}

filterClients() {
  

     const nom = this.filters.nom.toLowerCase().trim();
  const email = this.filters.email.toLowerCase().trim();
  const telephone = this.filters.telephone.toLowerCase().trim();
  const address = this.filters.address.toLowerCase().trim();
     this.filteredClients = this.clients.filter(client => {

    const fullName = (client.nom + ' ' + client.prenom).toLowerCase();
    const clientEmail = (client.email || '').toLowerCase();
    const clientPhone = (client.telephone || '').toLowerCase();
    const clientAddress = (client.adresse || '').toLowerCase();

    return (
      (!nom || fullName.includes(nom)) &&
      (!email || clientEmail.includes(email)) &&
      (!telephone || clientPhone.includes(telephone)) &&
      (!address || clientAddress.includes(address))
    );
  });
}
resetFilters() {
  this.filters = {
    nom: '',
    email: '',
    telephone: '',
    address: ''
  };

  this.filteredClients = this.clients;
}
userName     = '';
firstName = '';
userFullName = '';
lastName = '';

  get paginatedClients() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.filteredClients.slice(start, end);
}
changePage(page: number) {
  this.currentPage = page;
}
get totalPages(): number[] {
  const total = Math.ceil(this.filteredClients.length / this.itemsPerPage);
  return Array(total).fill(0).map((_, i) => i + 1);
}
logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
 
voirVoitures(cin: string) {
  this.router.navigate(['/detailclient', cin]);
}
deleteClient(cin: string) {

  if (!confirm("⚠️ Voulez-vous supprimer ce client ?")) return;

  this.apiService.deleteClient(cin).subscribe({
    next: () => {
      alert("✅ Client supprimé");

      this.clients = this.clients.filter(c => c.cin !== cin);
      this.filteredClients = this.filteredClients.filter(c => c.cin !== cin);
    },
    error: () => {
      alert("❌ Erreur suppression");
    }
  });
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
