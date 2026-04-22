import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/auth/home/home.component';
import { DashboardGaragisteComponent } from './dashboard-garagiste/dashboard-garagiste.component';
import { AfficherClientsComponent } from './afficher-clients/afficher-clients.component';
import { AjouteClientsComponent } from './ajoute-clients/ajoute-clients.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ModifierMotdepasseComponent } from './modifier-motdepasse/modifier-motdepasse.component';
import { AjouterVoitureComponent } from './ajouter-voiture/ajouter-voiture.component';
import { ModifierVehiculeComponent } from './modifier-vehicule/modifier-vehicule.component';
import { AfficheVehiculeComponent } from './affiche-vehicule/affiche-vehicule.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { UpdateCompteComponent } from './update-compte/update-compte.component';
import { MotdepasseOublieComponent } from './motdepasse-oublie/motdepasse-oublie.component';
import { MesvehiculeComponent } from './mesvehicule/mesvehicule.component';

const routes: Routes = [
  { path: '', component: HomeComponent  },
   {path: 'dashboard',component: DashboardGaragisteComponent},
   { path: 'afficherclient', component: AfficherClientsComponent },
  { path: 'ajouterclient', component: AjouteClientsComponent},
  {path: 'dashboardclient',component: DashboardClientComponent},
      { path: 'mes-vehicules', component: MesvehiculeComponent },

  {path: 'modifierprofil',component: ModifierProfilComponent},
  {path: 'editprofil/:id',component: EditProfileComponent},
  {path: 'modifiermotdepasse',component: ModifierMotdepasseComponent},
  {path: 'ajoutervoiture/:cin',component: AjouterVoitureComponent},
    {path: 'listevehicules',component: AfficheVehiculeComponent},
    { path: 'detailclient/:cin', component: DetailClientComponent },
      { path: 'motpasseoublie', component: MotdepasseOublieComponent },
      {path: 'modifiervehicule/:id',component: ModifierVehiculeComponent},
  {path: 'modifiercompte/:id',component: UpdateCompteComponent},
 { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
 
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
