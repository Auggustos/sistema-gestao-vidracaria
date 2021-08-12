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
import { MatDialog } from '@angular/material/dialog';
import { ModalCriarPessoaComponent } from '../modal-criar-pessoa/modal-criar-pessoa.component';

interface Tipos {
  id: number;
  tipo: string;
}

interface Situacoes {
  id: number;
  situacao: string;
}

interface Cliente {
  id: string;
  nome: string
}

@Component({
  selector: 'app-modal-criar-servico',
  templateUrl: './modal-criar-servico.component.html',
  styleUrls: ['./modal-criar-servico.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ModalCriarServicoComponent implements OnInit {


  tipos: Tipos[] = [
    { id: 0, tipo: 'Reforma' },
    { id: 1, tipo: 'Orçamento' },
    { id: 2, tipo: 'Instalação' },
  ];

  situacoes: Situacoes[] = [
    { id: 0, situacao: 'Realizado' },
    { id: 1, situacao: 'Não Realizado' },
  ];
  logado = false
  valorTipo: number;
  valorStatus: number;
  valorVenda

  clientesMap = new Map();

  clientes: Cliente[] = [];

  myControl = new FormControl();

  filteredOptions: Observable<{ nome: string, id: string }[]>;

  constructor(private apiService: ApiService, private dialogService: DialogService, private router: Router, private authService: AuthService, public dialog: MatDialog) {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(cliente => cliente ? this._filter(cliente) : this.clientes.slice())
      );
  }

  ngOnInit() {
    this.dialogService.showLoading()
    if (!this.authService.isLoggedIn()) {
      this.logado = false
    } else {
      this.logado = true;
    }
    this.apiService.getPessoas().subscribe(response => {
      response.results.forEach(cliente => {
        this.clientes.push({ nome: cliente.name, id: cliente.id })
        this.clientesMap.set(cliente.name, cliente.id);
      })

      this.filteredOptions = this.serviceForm.get('cliente').valueChanges
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

  hide = true;

  serviceForm = new FormGroup({
    cliente: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required),
    local: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    valor: new FormControl('', [Validators.required,Validators.min(0.01)]),
    status: new FormControl('', Validators.required),
  });
  goBack() {
    window.history.back();
  }
  cadastraServico() {
    const body = this.loadObject();
    this.dialogService.showLoading()
    this.apiService.postServico(body, this.authService.token).subscribe(success => {
      this.dialogService.closeAll();
      this.dialogService.showSuccess(`Serviço cadastrado com sucesso!`, "Cadastro Concluido").then(result => {
        this.router.navigateByUrl('servicos').then(success => location.reload())
      });
    },
      error => {
        this.dialogService.closeAll();
        this.dialogService.showError(`${error.error.message}`, "Acesso Negado!")
      });

  }
  loadObject() {
    return {
      customer_id: this.clientesMap.get(this.serviceForm.value.cliente),
      date: this.serviceForm.value.data,
      place: this.serviceForm.value.local,
      type: this.serviceForm.value.tipo,
      value: this.serviceForm.value.valor,
      status: this.serviceForm.value.status,
    }
  }
  cadastraCliente(){
    this.dialog.open(ModalCriarPessoaComponent, {
    });
  }

  private _filter(value: string): Cliente[] {

    const filterValue = value.toLowerCase();
    return this.clientes.filter(cliente => cliente.nome.toLowerCase().includes(filterValue));
  }
}
