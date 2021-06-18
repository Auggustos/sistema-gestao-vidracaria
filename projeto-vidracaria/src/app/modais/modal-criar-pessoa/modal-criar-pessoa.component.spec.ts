import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarPessoaComponent } from './modal-criar-pessoa.component';

describe('ModalCriarPessoaComponent', () => {
  let component: ModalCriarPessoaComponent;
  let fixture: ComponentFixture<ModalCriarPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCriarPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCriarPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
