import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuderiasComponent } from './escuderias.component';

describe('EscuderiasComponent', () => {
  let component: EscuderiasComponent;
  let fixture: ComponentFixture<EscuderiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscuderiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuderiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
