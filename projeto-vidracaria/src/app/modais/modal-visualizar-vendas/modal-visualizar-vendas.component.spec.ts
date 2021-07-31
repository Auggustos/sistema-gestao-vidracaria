import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarVendasComponent } from './modal-visualizar-vendas.component';

describe('ModalVisualizarVendasComponent', () => {
  let component: ModalVisualizarVendasComponent;
  let fixture: ComponentFixture<ModalVisualizarVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizarVendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
