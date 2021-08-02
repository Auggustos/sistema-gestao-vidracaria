import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../../classes/produto.class';
import { Router } from "@angular/router";

import { DialogService } from '../../shared/services/dialog/dialog.service'
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-atualizar-produtos',
  templateUrl: './modal-atualizar-produtos.component.html',
  styleUrls: ['./modal-atualizar-produtos.component.scss']
})
export class ModalAtualizarProdutosComponent implements OnInit {

  constructor(private dialogService: DialogService, private router: Router, private apiService: ApiService, private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  uploadData = new FormData();

  selectedFile: File

  imageSrc: any;

  hide = true;

  produto;
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    //image: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    this.dialogService.showLoading()
    this.apiService.getProduto(this.data.idProduto).subscribe(response => {
      if (response.id == this.data.idProduto) {

        this.produto = {
          name: response.name,
          description: response.description,
          quantity: response.quantity,
        }
        this.productForm.setValue(this.produto);
        this.dialogService.closeAll();
      }
    },
      error => {
        this.dialogService.closeAll();
        this.dialogService.showError(`${error.error.error}`, "Erro ao Recuperar Produto!")
      })
  }
  goBack() {
    window.history.back();
  }

  readURL(event): void {
    this.selectedFile = event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.uploadData = new FormData();

      this.uploadData.append('image', this.selectedFile, this.selectedFile.name);

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }

    this.productForm.controls['image'].setValue(this.selectedFile);
  }

  onUpload() {

    /*const uploadData = new FormData();
    uploadData.append('image', this.selectedFile);
    uploadData.append('name', this.productForm.value.name);
    uploadData.append('description', this.productForm.value.description);
    uploadData.append('quantity', this.productForm.value.quantity);
    uploadData.append('id', this.data.idProduto);
    */
    this.dialogService.showLoading();
    let body = this.loadBody();
    this.apiService.putProdutos(body, this.authService.token)
      .subscribe(
        success => {
          this.dialogService.closeAll();
          this.dialogService.showSuccess(`${this.productForm.value.name} Atualizado com sucesso!`, "Produto Atualizado!").then(result => {
            this.router.navigateByUrl('').then(success => location.reload())
          });
        },
        error => {
          this.dialogService.closeAll();
          this.dialogService.showError(`${error.error.error}`, "Erro na Atualização!");
        }
      );


  }

  loadBody(){
    return {
      id: this.data.idProduto,
      name: this.productForm.value.name,
      quantity: this.productForm.value.quantity,
      description: this.productForm.value.description
    }
  }
}
