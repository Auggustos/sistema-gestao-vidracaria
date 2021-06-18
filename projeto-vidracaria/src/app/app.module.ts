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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { ModalVisualizarProdutoComponent } from './modais/modal-visualizar-produto/modal-visualizar-produto.component';
import { ModalVisualizarPedidoComponent } from './modais/modal-visualizar-pedido/modal-visualizar-pedido.component';
import { ListagemProdutosComponent } from './listagem-produtos/listagem-produtos.component';
import { ModalCadastraProdutoComponent } from './modais/modal-cadastra-produto/modal-cadastra-produto.component';
import { AuthGuard, AuthInterceptor, AuthService } from './shared/services/auth.service';
import { AtualizaProdutoComponent } from './atualiza-produto/atualiza-produto.component';
import { GerirProdutosComponent } from './gerir-produtos/gerir-produtos.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';
import { ListagemServicosComponent } from './listagem-servicos/listagem-servicos.component';
import { ListagemPessoasComponent } from './listagem-pessoas/listagem-pessoas.component';
import { ListagemVendasComponent } from './listagem-vendas/listagem-vendas.component';
import { ModalCriarServicoComponent } from './modais/modal-criar-servico/modal-criar-servico.component';
import { ModalCriarVendaComponent } from './modais/modal-criar-venda/modal-criar-venda.component';
import { ModalCriarPessoaComponent } from './modais/modal-criar-pessoa/modal-criar-pessoa.component';

@NgModule({
  declarations: [
    ModalVisualizarProdutoComponent,    
    ModalVisualizarPedidoComponent,
    ModalCriarServicoComponent,
    ListagemProdutosComponent,
    ListagemServicosComponent,
    ModalCadastraProdutoComponent,
    AtualizaProdutoComponent,
    ModalCriarVendaComponent,
    ListagemPessoasComponent,
    ListagemVendasComponent,
    GerirProdutosComponent,
    TelaLoginComponent,
    ErrorComponent,
    AppComponent,
    ModalCriarPessoaComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    CurrencyMaskModule,
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
    ModalVisualizarPedidoComponent,
    ModalCriarServicoComponent,
    ModalCriarVendaComponent,
    ModalCriarPessoaComponent,
    ModalCadastraProdutoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
