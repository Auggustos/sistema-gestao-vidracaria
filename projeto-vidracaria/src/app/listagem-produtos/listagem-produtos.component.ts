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

  pesquisaCampos = [{ coluna: '', texto: '' },
  { coluna: 'codigo', texto: '' },
  { coluna: 'nome', texto: '' },
  { coluna: 'situacao', texto: '' },
  { coluna: 'tipo', texto: '' },
  { coluna: 'bairro', texto: '' },
  { coluna: 'fase', texto: '' },
  { coluna: "ids_setor_primario", texto: '' },
  { coluna: "ids_setor_secundario", texto: '' }];

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

  quantidadeProduto: { id: string, quantidade: number }[] = [];

  itensSidebar: string[] = ['Meus dados', 'Minhas compras'];

  ngOnInit(): void {

    this.apiService.getProdutos().subscribe(response => {
      let resposta = response;
     // console.log(resposta)
     // if (this.authService.isLoggedIn()) {
     //   const userId = this.authService.getUserId();
     //   response.forEach(produto => {
     //    if (produto.id_usuario != userId && produto.quantidade > 0) {
     //        this.produtos.push(produto);
     //      }
     //   })
     // } else {
        resposta.results.forEach(produto => {
          this.produtos.push(produto);      
        })
      //}
    },
      error => {
        this.dialogService.showError(`${error.error.error}`, "Erro ao Listar Produtos!")
      });

  }

  visualizaProduto(id: string) {
    this.dialog.open(ModalVisualizarProdutoComponent, {
      data: {
        idProduto: id,
      }
    });
    /* 
    if (!this.authService.isLoggedIn()) {
      this.dialogService.showWarning("Você precisa estar logado para adicionar algum item ao carrinho!", "Autentique-se!").then(result => {
        this.router.navigateByUrl('login').then(success => location.reload())
      })
    } else {
      this.dialog.open(ModalVisualizarProdutoComponent, {
        width: '20%',
        height: '601px',
        data: {
          idProduto: id,
        }
      });
    }
    */
  }

  createProduto() {
    this.dialog.open(ModalCadastraProdutoComponent, {
    });
  }
  onEnter(e) {
    //this.pesquisaCampos[0].texto = e.value.id
//    this.projetoTableChild.onChange();
  }
  onClean() {
    /*
    this.disableFiltroRapido = true;
    this.pesquisaCampos.forEach(e => {
      e.texto = "";
    });
    this.tipo_filtro = [];
    this.fase_filtro = [];
    this.filterAdvancedForm.patchValue({
      situacao_filtro: [],
      setorp_selecionados: [],
      setors_selecionados: []
    })
    this.onChange();
    */
  }

  onDelete(id: string, name: string){
    this.dialogService.showConfirm('Excluir produto', 'Deseja excluir o produto?').then(result =>{
      if(result.value == true){
        this.apiService.deletaProduto(id).subscribe(response =>{
            this.dialogService.showSuccess(`${name} Deletado com sucesso!`, "Produto Deletado!").then(result => {
            this.router.navigateByUrl('').then(success => location.reload())
            });
        },
          error =>{
            this.dialogService.showError(`${error.error.error}`, "Erro ao Excluir Produto!")
          })
      }
    });
   }
   onEdit(){
  
   }

  onChange() {
   // this.projetoTableChild.onChange();
  }

  limpaCampoPesquisa() {
    this.pesquisaCampos[0].texto = '';
    this.onChange();
  }

}
