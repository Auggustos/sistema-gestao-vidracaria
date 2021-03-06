import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCriarPessoaComponent } from '../modais/modal-criar-pessoa/modal-criar-pessoa.component';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
    public dialog: MatDialog) { }

    imageSrc: '../../assets/logo.png';

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('',  [Validators.required,Validators.minLength(6)]),
  });
  usuarios: { user: String, senha: String }[] = [];

  hide = true;

  ngOnInit(): void {
  }

  verificaUser() {
    this.dialogService.showLoading();
    this.authService.login(this.loginForm.value.usuario, this.loginForm.value.senha).subscribe(
      success => {
        this.dialogService.closeAll();
        this.dialogService.showSuccess(`Bem vindo ${this.authService.getUser()}`, "Login Realizado!").then(result => {

          this.router.navigateByUrl('').then(success => location.reload())
        })
      },
      error => {
        this.dialogService.closeAll();
        this.dialogService.showError('Usuário ou senha inválidos', "Acesso Negado!")
      }
    );

  }
  createPessoa() {
    this.dialog.open(ModalCriarPessoaComponent, {
    });
  }


}
