import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherClientsComponent } from './afficher-clients.component';

describe('AfficherClientsComponent', () => {
  let component: AfficherClientsComponent;
  let fixture: ComponentFixture<AfficherClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherClientsComponent]
    });
    fixture = TestBed.createComponent(AfficherClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
