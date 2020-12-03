import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMateriasAlumnoComponent } from './mostrar-materias-alumno.component';

describe('MostrarMateriasAlumnoComponent', () => {
  let component: MostrarMateriasAlumnoComponent;
  let fixture: ComponentFixture<MostrarMateriasAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarMateriasAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarMateriasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
