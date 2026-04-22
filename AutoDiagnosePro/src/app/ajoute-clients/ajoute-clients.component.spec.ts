import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteClientsComponent } from './ajoute-clients.component';

describe('AjouteClientsComponent', () => {
  let component: AjouteClientsComponent;
  let fixture: ComponentFixture<AjouteClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouteClientsComponent]
    });
    fixture = TestBed.createComponent(AjouteClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
