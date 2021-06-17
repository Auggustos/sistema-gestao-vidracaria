import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarProdutoComponent } from './modal-visualizar-produto.component';

describe('ModalVisualizarProdutoComponent', () => {
  let component: ModalVisualizarProdutoComponent;
  let fixture: ComponentFixture<ModalVisualizarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizarProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
