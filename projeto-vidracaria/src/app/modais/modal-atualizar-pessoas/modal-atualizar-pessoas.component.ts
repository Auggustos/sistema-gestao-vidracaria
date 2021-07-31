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

@Component({
  selector: 'app-modal-atualizar-pessoas',
  templateUrl: './modal-atualizar-pessoas.component.html',
  styleUrls: ['./modal-atualizar-pessoas.component.scss']
})
export class ModalAtualizarPessoasComponent implements OnInit {

  public mask = ['(', /[1-9]/, /\d/, ')',' ', /\d/,' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  tipos: Tipos[] = [
    {id: 0, tipo: 'Cliente'},
    {id: 1, tipo: 'Fornecedor'}
  ];


 valorTipo: number;
 valorStatus: number;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  
  myControl = new FormControl();

  filteredOptions: Observable<string[]>;


  ngOnInit() { }

  constructor(private apiService: ApiService, private dialogService: DialogService, private router : Router) { }

  hide = true;

  pessoaForm = new FormGroup({
    nome: new FormControl('',Validators.required),
    celular: new FormControl('',Validators.required),
    endereco: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required),

  });
  goBack() {
    window.history.back();
  }
  cadastraUsuario() {
    const body = this.loadObject();
    console.log(body);
   
    this.apiService.postPessoa(body).subscribe(success =>{
      this.dialogService.showSuccess(`Usuário ${body.name} cadastrado(a) com sucesso!`,"Cadastro Concluido").then(result => {
        this.router.navigateByUrl('/pessoas').then(success => location.reload())
      });
    },
    error => {
      this.dialogService.showError(`${error.error.message}`, "Acesso Negado!")
    });
    

  }
  loadObject(){
    return{
      name: this.pessoaForm.value.nome,
      phone: this.pessoaForm.value.celular,
      address: this.pessoaForm.value.endereco,
      type: this.pessoaForm.value.tipo,
    }
  }

}
