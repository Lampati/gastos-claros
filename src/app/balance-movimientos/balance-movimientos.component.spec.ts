import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceMovimientosComponent } from './balance-movimientos.component';

describe('BalanceMovimientosComponent', () => {
  let component: BalanceMovimientosComponent;
  let fixture: ComponentFixture<BalanceMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
