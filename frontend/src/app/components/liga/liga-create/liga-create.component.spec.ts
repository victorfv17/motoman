import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaCreateComponent } from './liga-create.component';

describe('LigaCreateComponent', () => {
  let component: LigaCreateComponent;
  let fixture: ComponentFixture<LigaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
