import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../../classes/produto.class';
import { Router } from "@angular/router";

import { DialogService } from '../../shared/services/dialog/dialog.service'
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-modal-cadastra-produto',
  templateUrl: './modal-cadastra-produto.component.html',
  styleUrls: ['./modal-cadastra-produto.component.css']
})
export class ModalCadastraProdutoComponent implements OnInit {

  constructor(private dialogService: DialogService, private router: Router, private apiSevice: ApiService, private authService: AuthService) { }

  uploadData = new FormData();

  selectedFile: File

  imageSrc: any;

  hide = true;

  produto: Produto;

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required),
    quantity: new FormControl('',[Validators.required,Validators.min(1)]),
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

      this.uploadData.append('image', this.selectedFile, this.selectedFile.name);

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }

    this.productForm.controls['image'].setValue(this.selectedFile);
  }

  onUpload() {

    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile);
    uploadData.append('name', this.productForm.value.name);
    uploadData.append('description', this.productForm.value.description);
    uploadData.append('quantity', this.productForm.value.quantity);
    this.apiSevice.postProdutos(uploadData) // usar isso aqui quando a api estiver esperando um formdata
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
