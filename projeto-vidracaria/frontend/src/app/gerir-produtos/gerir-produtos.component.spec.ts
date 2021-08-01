import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirProdutosComponent } from './gerir-produtos.component';

describe('GerirProdutosComponent', () => {
  let component: GerirProdutosComponent;
  let fixture: ComponentFixture<GerirProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerirProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerirProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
