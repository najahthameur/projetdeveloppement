import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AutoDiagnosePro';
    activeItem: string = 'dashboard';

  setActive(item: string) {
    this.activeItem = item;
  }
}
