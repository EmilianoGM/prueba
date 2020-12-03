import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncribirCursadaComponent } from './incribir-cursada.component';

describe('IncribirCursadaComponent', () => {
  let component: IncribirCursadaComponent;
  let fixture: ComponentFixture<IncribirCursadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncribirCursadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncribirCursadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
