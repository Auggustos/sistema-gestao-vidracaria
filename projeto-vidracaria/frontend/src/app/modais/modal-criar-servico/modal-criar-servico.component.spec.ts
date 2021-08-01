import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarServicoComponent } from './modal-criar-servico.component';

describe('ModalCriarServicoComponent', () => {
  let component: ModalCriarServicoComponent;
  let fixture: ComponentFixture<ModalCriarServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCriarServicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCriarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
