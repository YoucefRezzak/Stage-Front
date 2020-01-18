import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseAjouterComponent } from './classe-ajouter.component';

describe('ClasseAjouterComponent', () => {
  let component: ClasseAjouterComponent;
  let fixture: ComponentFixture<ClasseAjouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseAjouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
