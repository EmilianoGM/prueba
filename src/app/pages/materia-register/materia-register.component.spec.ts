import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaRegisterComponent } from './materia-register.component';

describe('MateriaRegisterComponent', () => {
  let component: MateriaRegisterComponent;
  let fixture: ComponentFixture<MateriaRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
