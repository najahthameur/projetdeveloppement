import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-compte',
  templateUrl: './update-compte.component.html',
  styleUrls: ['./update-compte.component.css']
})
export class UpdateCompteComponent  implements OnInit {
   form!: FormGroup;
  userId: string = '';
    showPassword = false;
    lastName = '';
    user: any;
    firstName = '';
userFullName = '';
  userName     = '';
  userInitials = '';
  garageName   = '';


  constructor( private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
         // 🔥 récupérer id depuis URL
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    // 🔵 récupérer user connecté (ex: localStorage)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
this.userId = user.id || user._id || '';
    // 🔵 form
    this.form = this.fb.group({
      nom: [user.nom || '', Validators.required],
      email: [user.email || '',     [Validators.required, Validators.email]],
      Nomgarage: [user.Nomgarage || ''],
      motdepasse: ['']
    });

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
   togglePassword() {
    this.showPassword = !this.showPassword;
  }
goToDashboard() {
  this.router.navigate(['/dashboard']);
}
  updateCompte() {
   
  if (this.form.invalid) {
    alert("Formulaire invalide");
    return;
  }
   const data: any = { ...this.form.value };

  // ❌ ne pas envoyer mot de passe vide
  if (!data.motdepasse) {
    delete data.motdepasse;
  }

  this.api.updateUser(this.userId, data).subscribe({
    next: (res) => {
      console.log(res);
      const updatedUser = { ...JSON.parse(localStorage.getItem('user') || '{}'), ...data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      alert("Compte mis à jour avec succès");
         // 🔥 retour dashboard après modification
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.log(err);
      alert("Erreur lors de la mise à jour");
    }
  });
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

}
