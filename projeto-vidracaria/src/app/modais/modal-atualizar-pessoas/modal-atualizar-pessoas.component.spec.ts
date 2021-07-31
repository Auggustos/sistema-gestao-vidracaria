import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtualizarPessoasComponent } from './modal-atualizar-pessoas.component';

describe('ModalAtualizarPessoasComponent', () => {
  let component: ModalAtualizarPessoasComponent;
  let fixture: ComponentFixture<ModalAtualizarPessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtualizarPessoasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAtualizarPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
