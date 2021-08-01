import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service'
import { DialogService } from '../../shared/services/dialog/dialog.service'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';

interface Tipos {
  id: number;
  tipo: string;
}

interface Situacoes {
  id: number;
  situacao: string;
}

interface Pagamentos {
  id: number;
  pagamento: string;
}

interface Pago {
  id: number;
  p: string;
}

@Component({
  selector: 'app-modal-criar-venda',
  templateUrl: './modal-criar-venda.component.html',
  styleUrls: ['./modal-criar-venda.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ModalCriarVendaComponent implements OnInit {
  name = 'Angular';
  valorVenda;
  itens;
  formattedAmount;
  amount;
  constructor(private apiService: ApiService, private dialogService: DialogService, private router: Router) { }

  tipos: Tipos[] = [
    { id: 0, tipo: 'Serviço' },
    { id: 1, tipo: 'Produto' },
  ];

  situacoes: Situacoes[] = [
    { id: 0, situacao: 'Realizado' },
    { id: 1, situacao: 'Não Realizado' },
  ];

  pagamentos: Pagamentos[] = [
    { id: 0, pagamento: 'Pagamento em cartão' },
    { id: 1, pagamento: 'Pagamento em dinheiro' },
  ];

  pago: Pago[] = [
    { id: 0, p: 'Sim' },
    { id: 1, p: 'Não' },
  ];

  hide = true;

  myControl = new FormControl();

  clientes: string[] = ['Ana', 'Marcos', 'Gabriel'];

  filteredOptions: Observable<string[]>;
  vendaForm = new FormGroup({
    cliente: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    produto: new FormControl('', Validators.required),
    tipo_pagamento: new FormControl('', Validators.required),
    pago: new FormControl('', Validators.required),
  });
  valorTipo: number;
  valorStatus: number;
  tipoPagamento: number;
  estaPago: number;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  goBack() {
    window.history.back();
  }

  cadastraVenda() {
    const body = this.loadObject();
    /*this.apiService.postVenda(body).subscribe(success =>{
      this.dialogService.showSuccess(`Venda cadastrada com sucesso!`,"Cadastro Concluido").then(result => {
        this.router.navigateByUrl('').then(success => location.reload())
      });
    },
    error => {
      this.dialogService.showError(`${error.error.message}`, "Acesso Negado!")
    });
    */
  }

  loadObject() {
    return {
      cliente: this.vendaForm.value.cliente,
      valor: this.vendaForm.value.valor,
      produto: this.vendaForm.value.produto,
      tipo_pagamento: this.vendaForm.value.tipo_pagamento,
      pago: this.vendaForm.value.pago,
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.clientes.filter(option => option.toLowerCase().includes(filterValue));
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
}
