import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../classes/produto.class';
import { ActivatedRoute, Router } from "@angular/router";

import { DialogService } from '../shared/services/dialog/dialog.service'
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-atualiza-produto',
  templateUrl: './atualiza-produto.component.html',
  styleUrls: ['./atualiza-produto.component.css']
})
export class AtualizaProdutoComponent implements OnInit {
  idProduto = '';
  constructor(private dialogService: DialogService, private router: Router, private apiSevice: ApiService, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== null && params['id']) {
        this.idProduto = params['id'];
      }

    });
  }

  uploadData = new FormData();

  selectedFile: File

  imageSrc: any;

  hide = true;

  productForm = new FormGroup({
    descricao: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    /*
    this.apiSevice.getProduto(this.idProduto, this.authService.token).subscribe(response => {
      this.productForm.controls['descricao'].setValue(response.descricao);
      this.productForm.controls['preco'].setValue(response.preco);
      this.productForm.controls['quantidade'].setValue(response.quantidade);
    },error => {
      this.dialogService.showError('Erro ao obter dados do produto!', "Erro!");
    })
    */
  }
  goBack() {
    window.history.back();
  }

  onUpload() {
    let body = this.loadBody()
    /*
    this.apiSevice.atualizaProduto(body, this.authService.token)
      .subscribe(
        success => {
          this.dialogService.showSuccess(`Produto atualizado com sucesso!`, "Atualizado!").then(result => {
            this.router.navigateByUrl('').then(success => location.reload())
          });
        },
        error => {
          this.dialogService.showError('Verifique os dados!', "Erro no Cadastro!");
        }
      );
      */
  }

  loadBody() {
    return {
      id: this.idProduto,
      descricao: this.productForm.value.descricao,
      quantidade: this.productForm.value.quantidade,
      preco: this.productForm.value.preco,
    }
  }

}
