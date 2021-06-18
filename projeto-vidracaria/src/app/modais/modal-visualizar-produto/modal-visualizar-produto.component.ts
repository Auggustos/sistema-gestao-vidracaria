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
    produto

  ngOnInit(): void {

    this.produto =  { id: 0,
      nome: 'Box de banheiro temperado',
      descricao: "box de banheiro xique demais",
      imagem: "https://http2.mlstatic.com/D_NQ_NP_688189-MLB41945925550_052020-O.jpg",
      quantidade: 10
    }
    /*
    this.apiService.getProdutos().subscribe(response => {
      if (this.authService.isLoggedIn()) {
        const userId = this.authService.getUserId();
        response.forEach(produto => {
          if (produto.id_usuario != userId && produto.id == this.data.idProduto) {
            this.produto = produto;
          }
        })
      }
    },
      error => {
        this.dialogService.showError(`${error.error.error}`, "Erro ao Exibir Produtos!")
      });
 
  */
 }
}
