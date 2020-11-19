import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaRegisterFormComponent } from './materia-register-form.component';

describe('MateriaRegisterFormComponent', () => {
  let component: MateriaRegisterFormComponent;
  let fixture: ComponentFixture<MateriaRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
