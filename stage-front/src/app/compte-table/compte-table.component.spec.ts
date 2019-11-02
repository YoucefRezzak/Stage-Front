import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteTableComponent } from './compte-table.component';

describe('CompteTableComponent', () => {
  let component: CompteTableComponent;
  let fixture: ComponentFixture<CompteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
