import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotosAddComponent } from './pilotos-add.component';

describe('PilotosAddComponent', () => {
  let component: PilotosAddComponent;
  let fixture: ComponentFixture<PilotosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilotosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilotosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
