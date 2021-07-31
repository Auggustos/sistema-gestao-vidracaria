import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pessoa } from 'src/app/classes/pessoa.class';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

@Component({
  selector: 'app-modal-visualizar-pessoa',
  templateUrl: './modal-visualizar-pessoa.component.html',
  styleUrls: ['./modal-visualizar-pessoa.component.scss']
})
export class ModalVisualizarPessoaComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  pessoa: Pessoa = null;

  ngOnInit(): void {    
    this.apiService.getPessoa(this.data.idPessoa).subscribe(response => {
    console.log(response);

    if (response.id == this.data.idPessoa) {

      this.pessoa = response;
    }
  },
    error => {
      this.dialogService.showError(`${error.error.error}`, "Erro ao Exibir Pessoa!")
    })

  }
}
