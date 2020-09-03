import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuacionEscuderiaComponent } from './puntuacion-escuderia.component';

describe('PuntuacionEscuderiaComponent', () => {
  let component: PuntuacionEscuderiaComponent;
  let fixture: ComponentFixture<PuntuacionEscuderiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntuacionEscuderiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntuacionEscuderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
