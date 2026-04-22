import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotdepasseOublieComponent } from './motdepasse-oublie.component';

describe('MotdepasseOublieComponent', () => {
  let component: MotdepasseOublieComponent;
  let fixture: ComponentFixture<MotdepasseOublieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotdepasseOublieComponent]
    });
    fixture = TestBed.createComponent(MotdepasseOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
