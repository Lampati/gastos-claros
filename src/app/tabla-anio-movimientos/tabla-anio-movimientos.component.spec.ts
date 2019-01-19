import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAnioMovimientosComponent } from './tabla-anio-movimientos.component';

describe('TablaAnioMovimientosComponent', () => {
  let component: TablaAnioMovimientosComponent;
  let fixture: ComponentFixture<TablaAnioMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaAnioMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAnioMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
