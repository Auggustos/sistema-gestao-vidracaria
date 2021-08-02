import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service'
import { DialogService } from '../../shared/services/dialog/dialog.service'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import { AuthService } from 'src/app/shared/services/auth.service';

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

interface Cliente {
  id: string;
  nome: string
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

  clientesMap = new Map();

  clientes: Cliente[] = [];

  constructor(private apiService: ApiService, private dialogService: DialogService, private router: Router,private authService: AuthService) {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(cliente => cliente ? this._filter(cliente) : this.clientes.slice())
      );
  }

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

  myControl = new FormControl('', Validators.required);

  filteredOptions: Observable<{ nome: string, id: string }[]>;
  vendaForm = new FormGroup({
    cliente: new FormControl('', Validators.required),
    valor: new FormControl('', [Validators.required,Validators.min(0.01)]),
    produto: new FormControl('', Validators.required),
    tipo_pagamento: new FormControl('', Validators.required),
    pago: new FormControl('', Validators.required),
  });
  valorTipo: number;
  valorStatus: number;
  tipoPagamento: number;
  estaPago: number;

  ngOnInit() {
    this.dialogService.showLoading()
    this.apiService.getPessoas().subscribe(response => {
      response.results.forEach(cliente => {
        this.clientes.push({ nome: cliente.name, id: cliente.id })
        this.clientesMap.set(cliente.name, cliente.id);
      })

      this.filteredOptions = this.vendaForm.get('cliente').valueChanges
        .pipe(
          startWith(''),
          map(cliente => cliente ? this._filter(cliente) : this.clientes.slice())
        );
      this.dialogService.closeAll();
    }, error => {
      this.dialogService.closeAll();
      this.dialogService.showError("Erro ao obter dados das pessoas!", "Erro");
    });
  }

  goBack() {
    window.history.back();
  }

  cadastraVenda() {
    const body = this.loadObject();
    this.dialogService.showLoading();
    this.apiService.postVenda(body,this.authService.token).subscribe(success =>{      
      this.dialogService.closeAll();
      this.dialogService.showSuccess(`Venda cadastrada com sucesso!`,"Cadastro Concluido").then(result => {
        this.router.navigateByUrl('/vendas').then(success => location.reload())
      });
    },
    error => {
      this.dialogService.closeAll();
      this.dialogService.showError(`${error.error.message}`, "Acesso Negado!")
    });
    
  }

  loadObject() {
    return {
      customer_id: this.clientesMap.get(this.vendaForm.value.cliente),
      value: this.vendaForm.value.valor,
      itens: this.vendaForm.value.produto,
      payment_type: this.vendaForm.value.tipo_pagamento,
      paid: this.vendaForm.value.pago,
    }
  }

  private _filter(value: string): Cliente[] {

    const filterValue = value.toLowerCase();
    return this.clientes.filter(cliente => cliente.nome.toLowerCase().includes(filterValue));
  }
}
