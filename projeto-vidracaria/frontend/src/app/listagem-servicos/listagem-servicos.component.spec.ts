import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemServicosComponent } from './listagem-servicos.component';

describe('ListagemServicosComponent', () => {
  let component: ListagemServicosComponent;
  let fixture: ComponentFixture<ListagemServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemServicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
