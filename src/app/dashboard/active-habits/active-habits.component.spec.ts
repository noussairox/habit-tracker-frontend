import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveHabitsComponent } from './active-habits.component';

describe('ActiveHabitsComponent', () => {
  let component: ActiveHabitsComponent;
  let fixture: ComponentFixture<ActiveHabitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveHabitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
