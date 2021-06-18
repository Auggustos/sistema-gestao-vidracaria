import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from "@angular/router";
import { ApiService } from '../shared/services/api.service'
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalVisualizarProdutoComponent } from '../modais/modal-visualizar-produto/modal-visualizar-produto.component';
import { ModalCadastraProdutoComponent } from '../modais/modal-cadastra-produto/modal-cadastra-produto.component';

export interface Produto {

  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  quantidade: number;

  }

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


  produtos: Produto[] = [
    { id: 0,
      nome: 'Box de banheiro temperado',
      descricao: "box de banheiro xique demais",
      imagem: "https://http2.mlstatic.com/D_NQ_NP_688189-MLB41945925550_052020-O.jpg",
      quantidade: 10
    },{
      id: 0,
      nome: 'Fechamento de pia temperado',
      descricao: "Fechamento de pia xique demais",
      imagem:"https://vidross.com/wp-content/uploads/2020/06/pia-vidro-temperado-fum%C3%AA.jpg",
      quantidade: 10
    },
    { id: 0,
      nome: 'Box de banheiro em acrílico',
      descricao: "box de banheiro xique demais",
      imagem: "https://2518.cdn.simplo7.net/static/2518/sku/box-de-banheiro-box-de-banheiro-em-acrilico-box-para-banheiro-de-acrilico-de-canto--p-1547122066382.jpg",
      quantidade: 10
    },{
      id: 0,
      nome: 'Fechamento de pia em acrílico',
      descricao: "Fechamento de pia xique demais",
      imagem:"https://www.shopad.com.br/ad-img/2015/10/06/fechamento-de-pia_226105772335_1444157552487_large.jpeg",
      quantidade: 10
    },    { id: 0,
      nome: 'Janela Transparente Temperado',
      descricao: "box de banheiro xique demais",
      imagem: "https://i.pinimg.com/originals/af/7e/21/af7e211f53f02cbc7b55c4aaf02b29b7.webp",
      quantidade: 10
    },{
      id: 0,
      nome: 'Janela basculante temperado',
      descricao: "Fechamento de pia xique demais",
      imagem:"https://http2.mlstatic.com/D_NQ_NP_910145-MLB41061029721_032020-O.jpg",
      quantidade: 10
    }
  ];

  showFiller = false;

  quantidadeProduto: { id: string, quantidade: number }[] = [];

  itensSidebar: string[] = ['Meus dados', 'Minhas compras'];

  ngOnInit(): void {
    this.authService.limpaCarrinho();
    /*this.apiService.getProdutos().subscribe(response => {
      if (this.authService.isLoggedIn()) {
        const userId = this.authService.getUserId();
        response.forEach(produto => {
          if (produto.id_usuario != userId && produto.quantidade > 0) {
            this.produtos.push(produto);
          }
        })
      } else {
        response.forEach(produto => {
          if (produto.quantidade > 0) {
            this.produtos.push(produto);
          }
        }
        )
      }
    },
      error => {
        this.dialogService.showError(`${error.error.error}`, "Erro ao Listar Produtos!")
      });
      */
  }
  adicionaAoCarrinho(idProduto: string, precoProduto: number, nome: string, quantidade: number) {
    let flag = 0;
    if (this.quantidadeProduto.length > 0) {
      for (let i = 0; i < this.quantidadeProduto.length; i++) {
        if (this.quantidadeProduto[i].id == idProduto) {
          flag = 1;
          if (flag == 1) {
            this.quantidadeProduto[i].quantidade--;
            break;
          }
        }
      }
      if (flag == 0) {
        this.quantidadeProduto.push({ id: idProduto, quantidade: quantidade - 1 });
      }
    } else {
      this.quantidadeProduto.push({ id: idProduto, quantidade: quantidade - 1 });
    }

    if (this.carrinho.length > 0) {
      let flag = 0;
      for (let i = 0; i < this.carrinho.length; i++) {
        if (this.carrinho[i].produtoId == idProduto) {
          this.carrinho[i].quantidade++;
          var textoCarrinho = JSON.stringify(this.carrinho);
          this.authService.setCarrinho(textoCarrinho);
          flag = 1
          break;
        }
      }
      if (flag == 0) {
        this.carrinho.push({ produtoId: idProduto, idCliente: this.authService.getUserId(), preco: precoProduto, quantidade: 1, nome: nome });
        var textoCarrinho = JSON.stringify(this.carrinho);
        this.authService.setCarrinho(textoCarrinho);
      }
    } else {
      this.carrinho.push({ produtoId: idProduto, idCliente: this.authService.getUserId(), preco: precoProduto, quantidade: 1, nome: nome });
      var textoCarrinho = JSON.stringify(this.carrinho);
      this.authService.setCarrinho(textoCarrinho);
    }

    if (!this.authService.isLoggedIn()) {
      this.dialogService.showWarning("Você precisa estar logado para adicionar algum item ao carrinho!", "Autentique-se!").then(result => {
        this.router.navigateByUrl('login').then(success => location.reload())
      })
    }
  }

  desabilitaCarrinho(idProduto): boolean {
    let flag = 0;
    if (this.quantidadeProduto.length > 0) {
      for (let i = 0; i < this.quantidadeProduto.length; i++) {
        if (this.quantidadeProduto[i].id == idProduto && this.quantidadeProduto[i].quantidade == 0) {
          flag = 1;
          return false;
        }
      }
      if (flag == 0) {
        return true
      }
    } else {
      return true;
    }
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

  onChange() {
   // this.projetoTableChild.onChange();
  }

  limpaCampoPesquisa() {
    this.pesquisaCampos[0].texto = '';
    this.onChange();
  }

}
