import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcCoComponent } from './ec-co.component';

describe('EcCoComponent', () => {
  let component: EcCoComponent;
  let fixture: ComponentFixture<EcCoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcCoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
