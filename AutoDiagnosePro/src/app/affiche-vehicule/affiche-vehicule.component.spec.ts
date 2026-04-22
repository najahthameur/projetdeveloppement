import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheVehiculeComponent } from './affiche-vehicule.component';

describe('AfficheVehiculeComponent', () => {
  let component: AfficheVehiculeComponent;
  let fixture: ComponentFixture<AfficheVehiculeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficheVehiculeComponent]
    });
    fixture = TestBed.createComponent(AfficheVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
