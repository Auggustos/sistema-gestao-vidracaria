/*
import { AtualizaUsuarioComponent } from './atualiza-usuario/atualiza-usuario.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { GerirVendasComponent } from './gerir-vendas/gerir-vendas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { RelatorioVendasComponent } from './relatorio-vendas/relatorio-vendas.component';
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemProdutosComponent } from './listagem-produtos/listagem-produtos.component';
import { AuthGuard } from './shared/services/auth.service';
import { ErrorComponent } from './error/error.component';
import { TelaLoginComponent } from './tela-login/tela-login.component'; 
import { ListagemServicosComponent } from './listagem-servicos/listagem-servicos.component';
import { ListagemVendasComponent } from './listagem-vendas/listagem-vendas.component';
import { ListagemPessoasComponent } from './listagem-pessoas/listagem-pessoas.component';
const routes: Routes = [
  {
    path: 'login',
    component: TelaLoginComponent
  },

  {
    path: '',
    component: ListagemProdutosComponent
  },
  {
    path: 'servicos',
    component: ListagemServicosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'vendas',
    component: ListagemVendasComponent, canActivate: [AuthGuard]
  },
  {
    path: 'pessoas',
    component: ListagemPessoasComponent, canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
