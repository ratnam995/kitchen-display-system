import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenDashboardComponent } from './kitchen-dashboard.component';

describe('KitchenDashboardComponent', () => {
  let component: KitchenDashboardComponent;
  let fixture: ComponentFixture<KitchenDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
