import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMateriasProfesorComponent } from './mostrar-materias-profesor.component';

describe('MostrarMateriasProfesorComponent', () => {
  let component: MostrarMateriasProfesorComponent;
  let fixture: ComponentFixture<MostrarMateriasProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarMateriasProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarMateriasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
