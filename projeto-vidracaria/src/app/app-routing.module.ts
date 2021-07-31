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
import { AtualizaProdutoComponent } from './atualiza-produto/atualiza-produto.component';
import { GerirProdutosComponent } from './gerir-produtos/gerir-produtos.component';
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
    path: 'produto/gerir',
    component: GerirProdutosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'produto/:id/atualiza',
    component: AtualizaProdutoComponent, canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ListagemProdutosComponent
  },
  {
    path: 'servicos',
    component: ListagemServicosComponent
  },
  {
    path: 'vendas',
    component: ListagemVendasComponent
  },
  {
    path: 'pessoas',
    component: ListagemPessoasComponent
  },
  {
    path: '**',
    component: ErrorComponent
  },
 /* 
  {
    path: 'usuario/atualiza',
    component: AtualizaUsuarioComponent, canActivate: [AuthGuard]
  },
   {
    path: 'pedidos',
    component: PedidosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'gerir',
    component: GerirVendasComponent, canActivate: [AuthGuard]
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'relatorio-vendas',
    component: RelatorioVendasComponent, canActivate: [AuthGuard]
  },
 */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
