import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuacionPilotoComponent } from './puntuacion-piloto.component';

describe('PuntuacionPilotoComponent', () => {
  let component: PuntuacionPilotoComponent;
  let fixture: ComponentFixture<PuntuacionPilotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntuacionPilotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntuacionPilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
