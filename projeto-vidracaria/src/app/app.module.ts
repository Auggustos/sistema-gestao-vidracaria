import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from './shared/services/dialog/dialog.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ModalVisualizarProdutoComponent } from './modais/modal-visualizar-produto/modal-visualizar-produto.component';
import { ModalVisualizarPedidoComponent } from './modais/modal-visualizar-pedido/modal-visualizar-pedido.component';
import { ListagemProdutosComponent } from './listagem-produtos/listagem-produtos.component';
import { CadastraUsuarioComponent } from './cadastra-usuario/cadastra-usuario.component';
import { CadastraProdutoComponent } from './cadastra-produto/cadastra-produto.component';
//import { AtualizaUsuarioComponent } from './atualiza-usuario/atualiza-usuario.component';
import { AuthGuard, AuthInterceptor, AuthService } from './shared/services/auth.service';
import { AtualizaProdutoComponent } from './atualiza-produto/atualiza-produto.component';
import { GerirProdutosComponent } from './gerir-produtos/gerir-produtos.component';
//import { GerirVendasComponent } from './gerir-vendas/gerir-vendas.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
//import { CarrinhoComponent } from './carrinho/carrinho.component';
//import { PedidosComponent } from './pedidos/pedidos.component';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';
import { ListagemServicosComponent } from './listagem-servicos/listagem-servicos.component';
import { ListagemPessoasComponent } from './listagem-pessoas/listagem-pessoas.component';
import { ListagemVendasComponent } from './listagem-vendas/listagem-vendas.component';
//import { ChartsModule } from 'ng2-charts'
//import { RelatorioVendasComponent } from './relatorio-vendas/relatorio-vendas.component';
//import { ChartVendasComponent } from './chart-vendas/chart-vendas.component';

@NgModule({
  declarations: [
    ModalVisualizarProdutoComponent,    
    ModalVisualizarPedidoComponent,
    ListagemProdutosComponent,
    CadastraUsuarioComponent,
    CadastraProdutoComponent,
//    AtualizaUsuarioComponent,
    AtualizaProdutoComponent,
    GerirProdutosComponent,
 //   GerirVendasComponent,
    TelaLoginComponent,
  //  PedidosComponent,
 //   CarrinhoComponent,
    ErrorComponent,
    AppComponent,
    ListagemServicosComponent,
    ListagemPessoasComponent,
    ListagemVendasComponent,
  //  RelatorioVendasComponent,
   // ChartVendasComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatGridListModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatTooltipModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatInputModule,
    MatTableModule,
    TextMaskModule,
    BrowserModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
  //  ChartsModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    DialogService
  ],
  entryComponents: [
    ModalVisualizarPedidoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
