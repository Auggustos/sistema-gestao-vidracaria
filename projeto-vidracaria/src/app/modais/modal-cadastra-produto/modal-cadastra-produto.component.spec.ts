import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastraProdutoComponent } from './modal-cadastra-produto.component';

describe('CadastraProdutoComponent', () => {
  let component: ModalCadastraProdutoComponent;
  let fixture: ComponentFixture<ModalCadastraProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastraProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastraProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
