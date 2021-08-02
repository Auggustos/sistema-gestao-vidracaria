import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Servico } from 'src/app/classes/servico.class';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
@Component({
  selector: 'app-modal-visualizar-servicos',
  templateUrl: './modal-visualizar-servicos.component.html',
  styleUrls: ['./modal-visualizar-servicos.component.scss']
})
export class ModalVisualizarServicosComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  servico: Servico = null;
  ngOnInit(): void {
    this.dialogService.showLoading();
    this.apiService.getServico(this.data.idServico, this.authService.token).subscribe(response => {
      this.dialogService.closeAll();
      if (response.id == this.data.idServico) {
        this.servico = response;
      }
    },
      error => {
        this.dialogService.closeAll();
        this.dialogService.showError(`${error.error.error}`, "Erro ao Exibir Serviço!")
      })
  }
}
