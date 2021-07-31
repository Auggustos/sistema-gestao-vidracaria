import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtualizarProdutosComponent } from './modal-atualizar-produtos.component';

describe('ModalAtualizarProdutosComponent', () => {
  let component: ModalAtualizarProdutosComponent;
  let fixture: ComponentFixture<ModalAtualizarProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtualizarProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAtualizarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
