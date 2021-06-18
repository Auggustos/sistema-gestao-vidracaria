import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service'
import{ DialogService } from '../../shared/services/dialog/dialog.service'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';

interface Tipos {
  id: number;
  tipo: string;
}

interface Situacoes {
  id: number;
  situacao: string;
}

@Component({
  selector: 'app-modal-criar-venda',
  templateUrl: './modal-criar-venda.component.html',
  styleUrls: ['./modal-criar-venda.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class ModalCriarVendaComponent implements OnInit {
 valorVenda;
  name = 'Angular';
 formattedAmount;
 amount;
  constructor(private apiService: ApiService, private dialogService: DialogService, private router : Router) { }

  tipos: Tipos[] = [
    {id: 0, tipo:'Reforma' },
    {id: 1, tipo:'Orçamento' },
    {id: 2, tipo:'Instalação' },
  ];

  situacoes: Situacoes[] = [
    {id: 0, situacao:'Realizado' },
    {id: 1, situacao:'Não Realizado' },
  ];

  hide = true;
  
  myControl = new FormControl();

  clientes: string[] = ['Ana', 'Marcos', 'Gabriel'];

  filteredOptions: Observable<string[]>;
  vendaForm = new FormGroup({
    cliente: new FormControl('',Validators.required),
    data: new FormControl('',Validators.required),
    local: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    valor: new FormControl('',Validators.required),
  });
 valorTipo: number;
 valorStatus: number;

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

  loadObject(){
    return{
      cliente: this.vendaForm.value.cliente,
      data: this.vendaForm.value.data,
      local: this.vendaForm.value.local,
      tipo: this.vendaForm.value.tipo,
      status: this.vendaForm.value.status,
      valor: this.vendaForm.value.valor
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
