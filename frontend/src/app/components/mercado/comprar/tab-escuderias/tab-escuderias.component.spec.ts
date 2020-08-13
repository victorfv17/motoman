import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEscuderiasComponent } from './tab-escuderias.component';

describe('TabEscuderiasComponent', () => {
  let component: TabEscuderiasComponent;
  let fixture: ComponentFixture<TabEscuderiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEscuderiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEscuderiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
