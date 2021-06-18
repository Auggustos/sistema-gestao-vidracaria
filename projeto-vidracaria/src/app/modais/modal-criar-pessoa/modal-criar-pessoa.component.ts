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
  selector: 'app-modal-criar-pessoa',
  templateUrl: './modal-criar-pessoa.component.html',
  styleUrls: ['./modal-criar-pessoa.component.scss']
})
export class ModalCriarPessoaComponent implements OnInit {


  public mask = ['(', /[1-9]/, /\d/, ')',' ', /\d/,' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  tipos: Tipos[] = [
    {id: 0, tipo:'Reforma' },
    {id: 1, tipo:'Orçamento' },
    {id: 2, tipo:'Instalação' },
  ];

  situacoes: Situacoes[] = [
    {id: 0, situacao:'Realizado' },
    {id: 1, situacao:'Não Realizado' },
  ];

 valorTipo: number;
 valorStatus: number;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  
  myControl = new FormControl();

  clientes: string[] = ['Ana', 'Marcos', 'Gabriel'];

  filteredOptions: Observable<string[]>;


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clientes.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(private apiService: ApiService, private dialogService: DialogService, private router : Router) { }

  hide = true;

  pessoaForm = new FormGroup({
    nome: new FormControl('',Validators.required),
    celular: new FormControl('',Validators.required),
    endereco: new FormControl('',Validators.required),
  });
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
      nome: this.pessoaForm.value.cliente,
      celular: this.pessoaForm.value.data,
      endereco: this.pessoaForm.value.local,
    }
  }

}
