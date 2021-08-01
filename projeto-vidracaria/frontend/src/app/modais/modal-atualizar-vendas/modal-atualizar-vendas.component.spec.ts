import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtualizarVendasComponent } from './modal-atualizar-vendas.component';

describe('ModalAtualizarVendasComponent', () => {
  let component: ModalAtualizarVendasComponent;
  let fixture: ComponentFixture<ModalAtualizarVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtualizarVendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAtualizarVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
