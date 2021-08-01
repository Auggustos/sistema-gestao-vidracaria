import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtualizarServicosComponent } from './modal-atualizar-servicos.component';

describe('ModalAtualizarServicosComponent', () => {
  let component: ModalAtualizarServicosComponent;
  let fixture: ComponentFixture<ModalAtualizarServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtualizarServicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAtualizarServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
