import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaSearchComponent } from './liga-search.component';

describe('LigaSearchComponent', () => {
  let component: LigaSearchComponent;
  let fixture: ComponentFixture<LigaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
