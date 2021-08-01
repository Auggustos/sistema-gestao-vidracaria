import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarPessoaComponent } from './modal-visualizar-pessoa.component';

describe('ModalVisualizarPessoaComponent', () => {
  let component: ModalVisualizarPessoaComponent;
  let fixture: ComponentFixture<ModalVisualizarPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizarPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
