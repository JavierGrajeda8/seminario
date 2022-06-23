import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoOrdenComponent } from './seguimiento-orden.component';

describe('SeguimientoOrdenComponent', () => {
  let component: SeguimientoOrdenComponent;
  let fixture: ComponentFixture<SeguimientoOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoOrdenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
