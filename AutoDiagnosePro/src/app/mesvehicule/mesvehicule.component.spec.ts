import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesvehiculeComponent } from './mesvehicule.component';

describe('MesvehiculeComponent', () => {
  let component: MesvehiculeComponent;
  let fixture: ComponentFixture<MesvehiculeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesvehiculeComponent]
    });
    fixture = TestBed.createComponent(MesvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
