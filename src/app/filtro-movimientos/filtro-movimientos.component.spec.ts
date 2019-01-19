import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroMovimientosComponent } from './filtro-movimientos.component';

describe('FiltroMovimientosComponent', () => {
  let component: FiltroMovimientosComponent;
  let fixture: ComponentFixture<FiltroMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
