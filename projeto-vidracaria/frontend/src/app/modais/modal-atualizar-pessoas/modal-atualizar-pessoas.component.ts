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
import { AuthService } from '../../shared/services/auth.service';
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

  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  tipos: Tipos[] = [
    { id: 0, tipo: 'Cliente' },
    { id: 1, tipo: 'Fornecedor' }
  ];


  valorTipo: number;
  valorStatus: number;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  myControl = new FormControl();
  pessoa;
  filteredOptions: Observable<string[]>;




  constructor(private apiService: ApiService, private dialogService: DialogService, private authService: AuthService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }

  hide = true;

  pessoaForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),

  });

  ngOnInit() {
    this.dialogService.showLoading()
    this.apiService.getPessoa(this.data.idPessoa).subscribe(response => {
      if (response.id == this.data.idPessoa) {
        // alto preenchimento dos campos
        this.pessoa = {
          nome: response.name,
          celular: response.phone,
          endereco: response.address,
          tipo: response.type,
        };
        this.valorTipo = 0;
        this.pessoaForm.setValue(this.pessoa);
        this.dialogService.closeAll();
      }
    },
      error => {
        this.dialogService.closeAll();
        this.dialogService.showError(`${error.error.error}`, "Erro ao Exibir Pessoa!")
      })
  }

  goBack() {
    window.history.back();
  }
  atualizaUsuario() {
    const body = this.loadObject();
    this.dialogService.showLoading()
    this.apiService.putPessoa(body, this.authService.token).subscribe(success => {
      this.dialogService.closeAll();
      this.dialogService.showSuccess(`Usu??rio ${body.name} atualizado(a) com sucesso!`, "Atualiza????o Concluida").then(result => {
        this.router.navigateByUrl('/pessoas').then(success => location.reload())
      });
    },
      error => {
        this.dialogService.closeAll();
        this.dialogService.showError(`${error.error.message}`, "Acesso Negado!")
      });

  }
  loadObject() {
    return {
      id: this.data.idPessoa,
      name: this.pessoaForm.value.nome,
      phone: this.pessoaForm.value.celular,
      address: this.pessoaForm.value.endereco,
      type: this.pessoaForm.value.tipo,
    }
  }

}
