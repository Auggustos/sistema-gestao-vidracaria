import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Produto } from 'src/app/classes/produto.class';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { ModalAtualizarProdutosComponent } from '../modal-atualizar-produtos/modal-atualizar-produtos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-visualizar-produto',
  templateUrl: './modal-visualizar-produto.component.html',
  styleUrls: ['./modal-visualizar-produto.component.css']
})
export class ModalVisualizarProdutoComponent implements OnInit {
  logado = false

  constructor(
    private apiService: ApiService, 
    private authService: AuthService, 
    private dialogService: DialogService, 
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
    produto: Produto = null;

  ngOnInit(): void {
     if (!this.authService.isLoggedIn()) {
      this.logado = false
    } else {
      this.logado = true;
    }

 }

 onDelete(id: string, name: string) {
  this.dialogService.showConfirmWaring('Excluir produto', 'Tem certeza que deseja excluir o produto? ele será excluído permanentemente.').then(result => {
    if (result.value == true) {
      this.dialogService.showLoading();
      this.apiService.deletaProduto(id).subscribe(response => {
        this.dialogService.closeAll();
        this.dialogService.showSuccess(`${name} Deletado com sucesso!`, "Produto Deletado!").then(result => {
          this.router.navigateByUrl('').then(success => location.reload())
        });
      },
        error => {
          this.dialogService.closeAll();
          this.dialogService.showError(`${error.error.error}`, "Erro ao Excluir Produto!")
        })
    }
  });
}
onUpdate(id: string) {
  this.dialog.open(ModalAtualizarProdutosComponent, {
    data: {
      idProduto: id,
    }
  });
}
}
