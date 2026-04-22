import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
   selectedView: string = 'dashboard';

user: any = {};
  id: string = '';
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
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
     private http: HttpClient
  ) {}
  ngOnInit() {

    const data = localStorage.getItem('user');

    if (data) {
      this.user = JSON.parse(data);
     

      this.firstName = this.user.nom || '';
      this.lastName = this.user.prenom || '';
      
    }
// 🔥 récupérer ID depuis URL
  this.id = this.route.snapshot.paramMap.get('id')!;

    // 🔥 récupérer depuis MongoDB
    this.http.get(`http://localhost:3000/api/clients/${this.id}`)
      .subscribe({
        next: (data: any) => {
          this.user = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
 goToEdit() {
    this.http.put(
      `http://localhost:3000/api/update/${this.id}`,
      {
        email: this.user.email,
        telephone: this.user.telephone,
        adresse: this.user.adresse
      }
    ).subscribe({
      next: (res: any) => {
        alert("Profil modifié avec succès ✅");

            localStorage.setItem('user', JSON.stringify(this.user));

        // retour dashboard
         this.router.navigate(['/modifierprofil']);
      },
      error: (err) => {
        console.error(err);
        alert("Erreur modification ❌");
      }
    });
  
 
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

cancel() {
  this.router.navigate(['/modifierprofil']);
}
 logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}