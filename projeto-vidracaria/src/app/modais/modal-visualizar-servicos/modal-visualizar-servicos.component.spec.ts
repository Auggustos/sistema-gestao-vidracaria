import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarServicosComponent } from './modal-visualizar-servicos.component';

describe('ModalVisualizarServicosComponent', () => {
  let component: ModalVisualizarServicosComponent;
  let fixture: ComponentFixture<ModalVisualizarServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizarServicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
