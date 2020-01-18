import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcritureTableComponent } from './ecriture-table.component';

describe('EcritureTableComponent', () => {
  let component: EcritureTableComponent;
  let fixture: ComponentFixture<EcritureTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcritureTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcritureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
