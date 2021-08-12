import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from "@angular/router";
import { ApiService } from '../shared/services/api.service'
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalVisualizarProdutoComponent } from '../modais/modal-visualizar-produto/modal-visualizar-produto.component';
import { ModalCadastraProdutoComponent } from '../modais/modal-cadastra-produto/modal-cadastra-produto.component';

import { Produto } from 'src/app/classes/produto.class';


@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css']
})
export class ListagemProdutosComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  logado = false


  pesquisaCampos = [{ coluna: '', texto: '' }];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  carrinho: { produtoId: string, idCliente: string, preco: number, quantidade: number, nome: string }[] = [];

  constructor(private apiService: ApiService, private authService: AuthService, private dialogService: DialogService, private router: Router,
    public dialog: MatDialog) { }


  produtos: Produto[] = [];

  showFiller = false;

  ngOnInit(): void {
    this.produtos = [];

    if (!this.authService.isLoggedIn()) {
      this.logado = false
    } else {
      this.logado = true;
    }
    this.dialogService.showLoading();
    this.apiService.getProdutos().subscribe(response => {
      this.dialogService.closeAll();
      let resposta = response;
      resposta.results.forEach(produto => {
        this.produtos.push(produto);
      })
    },
      error => {
        this.dialogService.closeAll();
        this.dialogService.showError(`${error.error.error}`, "Erro ao Listar Produtos!")
      });

  }

  visualizaProduto(id: string) {
    this.dialog.open(ModalVisualizarProdutoComponent, {
      data: {
        idProduto: id,
      }
    });
  }

  createProduto() {
    this.dialog.open(ModalCadastraProdutoComponent, {
    });
  }

  onChange() {
  }

  onEnter(e) {
    this.produtos = [];
    this.apiService.getProdutos().subscribe(response => {
      let resposta = response;
      resposta.results.forEach(produto => {
        if (produto.name.toLowerCase().includes(this.pesquisaCampos[0].texto.toLowerCase())) {
          this.produtos.push(produto);
        }
      })
    },
      error => {
        this.dialogService.showError(`${error.error.error}`, "Erro ao filtrar lista de produtos!")
      });
  }
  onClean() {
    this.pesquisaCampos[0].texto = '';
    this.ngOnInit();
  }

}
