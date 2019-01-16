import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenMovimientosComponent } from './resumen-movimientos.component';

describe('ResumenMovimientosComponent', () => {
  let component: ResumenMovimientosComponent;
  let fixture: ComponentFixture<ResumenMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
