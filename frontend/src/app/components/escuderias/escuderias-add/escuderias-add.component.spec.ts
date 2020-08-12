import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuderiasAddComponent } from './escuderias-add.component';

describe('EscuderiasAddComponent', () => {
  let component: EscuderiasAddComponent;
  let fixture: ComponentFixture<EscuderiasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscuderiasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuderiasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
