import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Produto } from 'src/app/classes/produto.class';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

@Component({
  selector: 'app-modal-visualizar-produto',
  templateUrl: './modal-visualizar-produto.component.html',
  styleUrls: ['./modal-visualizar-produto.component.css']
})
export class ModalVisualizarProdutoComponent implements OnInit {

  constructor(
    private apiService: ApiService, 
    private authService: AuthService, 
    private dialogService: DialogService, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    produto: Produto = null;

  ngOnInit(): void {
    this.dialogService.showLoading();
    this.apiService.getProduto(this.data.idProduto).subscribe(response =>{
      this.dialogService.closeAll();

      if(response.id == this.data.idProduto){
        
        this.produto = response;
      }
    },
      error =>{
        this.dialogService.closeAll();
        this.dialogService.showError(`${error.error.error}`, "Erro ao Exibir Produto!")
      })
 }
}
