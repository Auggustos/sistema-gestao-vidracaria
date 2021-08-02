import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service'
import { DialogService } from '../../shared/services/dialog/dialog.service'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  selector: 'app-modal-atualizar-servicos',
  templateUrl: './modal-atualizar-servicos.component.html',
  styleUrls: ['./modal-atualizar-servicos.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ModalAtualizarServicosComponent implements OnInit {


  tipos: Tipos[] = [
    { id: 0, tipo: 'Reforma' },
    { id: 1, tipo: 'Orçamento' },
    { id: 2, tipo: 'Instalação' },
  ];

  situacoes: Situacoes[] = [
    { id: 0, situacao: 'Realizado' },
    { id: 1, situacao: 'Não Realizado' },
  ];

  valorTipo: number;
  valorStatus: number;
  valorVenda

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  myControl = new FormControl();

  filteredOptions: Observable<{ nome: string, id: string }[]>;

  constructor(private apiService: ApiService, private dialogService: DialogService, private router: Router, private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filteredOptions = this.serviceForm.get('cliente').valueChanges
      .pipe(
        startWith(''),
        map(cliente => cliente ? this._filter(cliente) : this.clientes.slice())
      );
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

  clientesMap = new Map();

  clientes: Cliente[] = [];

  ngOnInit() {
    this.dialogService.showLoading()
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

    this.apiService.getServico(this.data.idServico, this.authService.token).subscribe(response => {
      if (response.id == this.data.idServico) {

        console.log(response)

        let servico = {
          cliente: response.customer.name,
          data: response.date,
          local: response.place,
          tipo: response.type,
          valor: response.value,
          status: response.status,
        };

        this.serviceForm.setValue(servico);
        this.dialogService.closeAll();
      }
    },
      error => {
        this.dialogService.closeAll();
        this.dialogService.showError(`${error.error.error}`, "Erro ao Recuperar Serviço!")
      })
  }

  goBack() {
    window.history.back();
  }
  atualizaServico() {
    const body = this.loadObject();
    this.dialogService.showLoading();
    this.apiService.putServico(body,this.authService.token).subscribe(success =>{
      this.dialogService.closeAll();
      this.dialogService.showSuccess(`Serviço atualizado com sucesso!`,"Serviço Atualizado").then(result => {
        this.router.navigateByUrl('/servicos').then(success => location.reload())
      });
    },
    error => {
      this.dialogService.closeAll();
      this.dialogService.showError(`${error.error.message}`, "Erro ao Atualizar!")
    });
    
  }
  loadObject() {
    return {
      id: this.data.idServico,
      customer_id: this.clientesMap.get(this.serviceForm.value.cliente),
      date: this.serviceForm.value.data,
      place: this.serviceForm.value.local,
      type: this.serviceForm.value.tipo,
      value: this.serviceForm.value.valor,
      status: this.serviceForm.value.status,
    }
  }

  private _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.clientes.filter(cliente => cliente.nome.toLowerCase().includes(filterValue));
  }
}
