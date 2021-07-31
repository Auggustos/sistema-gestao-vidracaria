import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-modal-atualizar-vendas',
  templateUrl: './modal-atualizar-vendas.component.html',
  styleUrls: ['./modal-atualizar-vendas.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ModalAtualizarVendasComponent implements OnInit {
  name = 'Angular';
  valorVenda;
  itens;
  formattedAmount;
  amount;
  constructor(private apiService: ApiService, private dialogService: DialogService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    data: new FormControl('', Validators.required),
    itens: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    pagamento: new FormControl('', Validators.required),
    produto: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    pago: new FormControl('', Validators.required),
  });
  valorTipo: number;
  valorStatus: number;
  tipoPagamento: number;
  foiPago: number;

  ngOnInit() {


    let venda = {
      cliente: "Sachin",
      data: new Date(),
      itens: "dale",
      valor: '850,00',
      pagamento: 0,
      produto: '2Kg massa de vidro, 1m² vidro fumê',
      tipo: 0,
      pago: "sim",
    };

    this.valorVenda = 850
    this.itens = '2Kg massa de vidro, 1m² vidro fumê'
    this.valorTipo = 0;
    this.vendaForm.setValue(venda);
    this.tipoPagamento = 0;
    this.foiPago = 0;

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  goBack() {
    window.history.back();
  }

  cadastraUsuario() {
    const body = this.loadObject();
    /*this.apiService.postUsuario(body).subscribe(success =>{
      this.dialogService.showSuccess(`Usuário ${body.nome} cadastrado com sucesso!`,"Cadastro Concluido").then(result => {
        this.router.navigateByUrl('login').then(success => location.reload())
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
      data: this.vendaForm.value.data,
      itens: this.vendaForm.value.produto,
      valor: this.vendaForm.value.valor,
      pagamento: this.vendaForm.value.pagamento,
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
