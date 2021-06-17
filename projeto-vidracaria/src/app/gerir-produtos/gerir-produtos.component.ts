import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Produto } from '../classes/produto.class';
import { ApiService } from '../shared/services/api.service'
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog/dialog.service';
@Component({
  selector: 'app-gerir-produtos',
  templateUrl: './gerir-produtos.component.html',
  styleUrls: ['./gerir-produtos.component.css']
})
export class GerirProdutosComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(private apiService: ApiService, private authService: AuthService, private dialogService: DialogService, private router: Router) { }
  produtos: Produto[] = [];

  showFiller = false;

  itensSidebar: string[] = ['Meus dados', 'Minhas compras'];

  ngOnInit(): void {
/*
    this.apiService.getProdutos().subscribe(response => {
      const userId = this.authService.getUserId();
      response.forEach(produto => {
        if (produto.id_usuario == userId) {
          this.produtos.push(produto);
        }
      })
    });
    */
  }

  editaAnuncio(idProduto: string) {
    let url = 'produto/ID/atualiza';
    this.router.navigateByUrl(url.replace('ID',idProduto)).then(success => location.reload())
  }
  excluiAnuncio(idProduto: string) {
    /*
    this.dialogService.showConfirm("Excluir?", "Voce realmente deseja excluir este produto?").then(
      result => {
        if(result.value){
          this.apiService.deletaProduto(idProduto, this.authService.token).subscribe(
            success => {
              this.dialogService.showSuccess(`Produto deletado com sucesso!`, "Deletado!").then(result => {
                this.router.navigateByUrl('').then(success => location.reload())
              });
            },
            error => {
              this.dialogService.showError('Erro ao deletar, tente novamente!', "Erro!");
            }
          );
        }
      }
    )
  */
  }
}
