import { Component ,OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mesvehicule',
  templateUrl: './mesvehicule.component.html',
  styleUrls: ['./mesvehicule.component.css']
})
export class MesvehiculeComponent implements OnInit {
  voitures: any[] = [];
  loading = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyVoitures();
  }

  loadMyVoitures() {
    this.loading = true;

    this.api.getMyVoitures().subscribe({
      next: (data) => {
        this.voitures = data;
        this.loading = false;
        console.log("🚗 Mes voitures client =", data);
      },
      error: (err) => {
        console.error("❌ erreur voitures =", err);
        this.loading = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
