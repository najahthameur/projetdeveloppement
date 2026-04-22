import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/auth/home/home.component';
import { DashboardGaragisteComponent } from './dashboard-garagiste/dashboard-garagiste.component';
import { AfficherClientsComponent } from './afficher-clients/afficher-clients.component';
import { AjouteClientsComponent } from './ajoute-clients/ajoute-clients.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardGaragisteComponent,
    AfficherClientsComponent,
    AjouteClientsComponent,
    DashboardClientComponent,
    ModifierProfilComponent,
    EditProfileComponent,
    ModifierMotdepasseComponent,
    AjouterVoitureComponent,
    ModifierVehiculeComponent,
    AfficheVehiculeComponent,
    DetailClientComponent,
    UpdateCompteComponent,
    MotdepasseOublieComponent,
    MesvehiculeComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,  
    HomeComponent,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
