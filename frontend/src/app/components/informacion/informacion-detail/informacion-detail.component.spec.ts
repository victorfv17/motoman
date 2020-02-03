import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionDetailComponent } from './informacion-detail.component';

describe('InformacionDetailComponent', () => {
  let component: InformacionDetailComponent;
  let fixture: ComponentFixture<InformacionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
