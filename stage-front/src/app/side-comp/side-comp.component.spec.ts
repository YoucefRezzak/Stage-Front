import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCompComponent } from './side-comp.component';

describe('SideCompComponent', () => {
  let component: SideCompComponent;
  let fixture: ComponentFixture<SideCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
