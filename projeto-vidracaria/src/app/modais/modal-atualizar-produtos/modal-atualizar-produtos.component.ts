import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../../classes/produto.class';
import { Router } from "@angular/router";

import { DialogService } from '../../shared/services/dialog/dialog.service'
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-modal-atualizar-produtos',
  templateUrl: './modal-atualizar-produtos.component.html',
  styleUrls: ['./modal-atualizar-produtos.component.scss']
})
export class ModalAtualizarProdutosComponent implements OnInit {

  constructor(private dialogService: DialogService, private router: Router, private apiSevice: ApiService, private authService: AuthService) { }

  uploadData = new FormData();

  selectedFile: File

  imageSrc: any;

  hide = true;

  produto: Produto;

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required),
    imageUrl: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
  }
  goBack() {
    window.history.back();
  }

  readURL(event): void {
    this.selectedFile = event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.uploadData = new FormData();

      this.uploadData.append('imageUrl', this.selectedFile, this.selectedFile.name);

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }

    this.productForm.controls['imageUrl'].setValue(this.selectedFile);
  }

  onUpload() {

    const uploadData = new FormData();
   // uploadData.append('imageUrl', this.selectedFile);
   uploadData.append('imageUrl', 'string de imagem');
    uploadData.append('name', this.productForm.value.name);
    uploadData.append('description', this.productForm.value.description);
    uploadData.append('quantity', this.productForm.value.quantity);

    let body = { // trocar isso aqui no futuro
      imageUrl: 'string de imagem',
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      quantity: this.productForm.value.quantity
    }
    //this.apiSevice.postProdutos(uploadData)
    this.apiSevice.postProdutos(body) // usar isso aqui quando a api estiver esperando um formdata
      .subscribe(
        success => {
          this.dialogService.showSuccess(`${this.productForm.value.name} cadastrado com sucesso!`, "Produto Cadastrado!").then(result => {
          this.router.navigateByUrl('').then(success => location.reload())
          });
        },
        error => {
          this.dialogService.showError(`${error.error.error}`, "Erro no Cadastro!");
        }
      );
 
   
  }
}
