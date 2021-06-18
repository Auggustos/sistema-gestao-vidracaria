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
 /*

 */
  productForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('',Validators.required),
    preco: new FormControl('', Validators.required),
    imagem: new FormControl('',Validators.required),
    id_usuario: new FormControl(this.authService.getUserId(),Validators.required),
    quantidade: new FormControl('',Validators.required),
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

      this.uploadData.append('imagem', this.selectedFile, this.selectedFile.name);

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }

    this.productForm.controls['imagem'].setValue(this.selectedFile);
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('imagem', this.selectedFile);
    uploadData.append('nome', this.productForm.value.nome);
    uploadData.append('descricao', this.productForm.value.descricao);
    uploadData.append('preco', this.productForm.value.preco);
    uploadData.append('quantidade', this.productForm.value.quantidade);
    uploadData.append('id_usuario', this.productForm.value.id_usuario);

    /*
 this.apiSevice.postProdutos(uploadData)
      .subscribe(
        success => {
          this.dialogService.showSuccess(`${this.productForm.value.nome} cadastrado com sucesso!`, "Produto Cadastrado!").then(result => {
            this.router.navigateByUrl('').then(success => location.reload())
          });
        },
        error => {
          this.dialogService.showError(`${error.error.error}`, "Erro no Cadastro!");
        }
      );
 */
   
  }

}
