import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPilotosComponent } from './tab-pilotos.component';

describe('TabPilotosComponent', () => {
  let component: TabPilotosComponent;
  let fixture: ComponentFixture<TabPilotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPilotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPilotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
