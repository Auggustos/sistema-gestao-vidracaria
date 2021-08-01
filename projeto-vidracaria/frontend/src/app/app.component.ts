import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { exit } from 'process';
import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';
import { DialogService } from './shared/services/dialog/dialog.service';

export interface rotas {
  nome: string,
  rota: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projeto-vidracaria';

  badge: number;

  constructor(private router: Router, private authService: AuthService, private dialogService: DialogService, private apiService: ApiService) {
  }
  usuario = '';
  usuarioId = '';

  logado = false;

  ngOnInit() {

    if (!this.authService.isLoggedIn()) {
      this.usuario = '';
      this.logado = false
    } else {
      this.usuario = this.authService.getUser();
      this.logado = true;
    }
  }

  desloga() {
    this.dialogService.showConfirmWaring('Deslogar', 'Tem certeza que deseja encerrar sua sessão?').then(result => {
      if (result.value == true) {
        location.reload();
        this.authService.logout();
        this.usuario = this.authService.getUser();
        if (!this.authService.isLoggedIn()) {
          this.usuario = '';
        }
        this.dialogService.showSuccess("Logout realizado com sucesso!", "Logout");
      }
    });
  }

  itensSidebar: rotas[] = [
    { nome: 'pessoas', rota: 'pessoas' },
    { nome: 'vendas', rota: 'vendas' },
    { nome: 'servicos', rota: 'servicos' },
    { nome: 'Produtos', rota: '' }];
  onRowClicked(item: rotas) {
    this.router.navigate([item.rota]);

  }
}
