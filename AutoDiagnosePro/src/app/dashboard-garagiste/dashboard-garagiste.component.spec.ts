import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGaragisteComponent } from './dashboard-garagiste.component';

describe('DashboardGaragisteComponent', () => {
  let component: DashboardGaragisteComponent;
  let fixture: ComponentFixture<DashboardGaragisteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardGaragisteComponent]
    });
    fixture = TestBed.createComponent(DashboardGaragisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
