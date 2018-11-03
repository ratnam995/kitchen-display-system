import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCmpComponent } from './grid-cmp.component';

describe('GridCmpComponent', () => {
  let component: GridCmpComponent;
  let fixture: ComponentFixture<GridCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
