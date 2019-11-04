import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauPeriodeComponent } from './tableau-periode.component';

describe('TableauPeriodeComponent', () => {
  let component: TableauPeriodeComponent;
  let fixture: ComponentFixture<TableauPeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauPeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
