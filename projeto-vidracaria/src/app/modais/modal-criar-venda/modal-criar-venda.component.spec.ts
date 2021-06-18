import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarVendaComponent } from './modal-criar-venda.component';

describe('ModalCriarVendaComponent', () => {
  let component: ModalCriarVendaComponent;
  let fixture: ComponentFixture<ModalCriarVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCriarVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCriarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
