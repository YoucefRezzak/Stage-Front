import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcCoTableComponent } from './ec-co-table.component';

describe('EcCoTableComponent', () => {
  let component: EcCoTableComponent;
  let fixture: ComponentFixture<EcCoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcCoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcCoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
