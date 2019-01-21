import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenBancosComponent } from './resumen-bancos.component';

describe('ResumenBancosComponent', () => {
  let component: ResumenBancosComponent;
  let fixture: ComponentFixture<ResumenBancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenBancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
