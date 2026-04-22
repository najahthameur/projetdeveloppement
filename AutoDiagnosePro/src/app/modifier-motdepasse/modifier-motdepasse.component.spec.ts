import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMotdepasseComponent } from './modifier-motdepasse.component';

describe('ModifierMotdepasseComponent', () => {
  let component: ModifierMotdepasseComponent;
  let fixture: ComponentFixture<ModifierMotdepasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierMotdepasseComponent]
    });
    fixture = TestBed.createComponent(ModifierMotdepasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
