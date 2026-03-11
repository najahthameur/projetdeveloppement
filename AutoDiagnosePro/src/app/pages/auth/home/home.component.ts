import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // Si votre projet utilise les standalone components (Angular 14+), gardez ces imports.
  // Sinon, supprimez "standalone" et "imports" et déclarez HomeComponent dans app.module.ts
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent {}