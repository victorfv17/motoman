import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlineacionComponent } from './alineacion.component';

describe('AlineacionComponent', () => {
  let component: AlineacionComponent;
  let fixture: ComponentFixture<AlineacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlineacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlineacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
