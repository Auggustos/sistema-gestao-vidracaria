import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from "@angular/router";
import { Produto } from '../classes/produto.class';
import { ApiService } from '../shared/services/api.service'
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCriarVendaComponent } from '../modais/modal-criar-venda/modal-criar-venda.component';
import { ModalVisualizarVendasComponent } from '../modais/modal-visualizar-vendas/modal-visualizar-vendas.component';
import { ModalAtualizarVendasComponent } from '../modais/modal-atualizar-vendas/modal-atualizar-vendas.component';
import { Vendas } from '../classes/venda.class';

export interface PeriodicElement {
  cliente: string;
  valor: number;
  pagamento_em: string;
  pago: string;
}

let ELEMENT_DATA: Vendas[] = []

@Component({
  selector: 'app-listagem-vendas',
  templateUrl: './listagem-vendas.component.html',
  styleUrls: ['./listagem-vendas.component.scss']
})
export class ListagemVendasComponent implements OnInit {

  pesquisaCampos = [{ coluna: '', texto: '' },
  { coluna: 'codigo', texto: '' },
  { coluna: 'nome', texto: '' },
  { coluna: 'situacao', texto: '' },
  { coluna: 'tipo', texto: '' },
  { coluna: 'bairro', texto: '' },
  { coluna: 'fase', texto: '' },
  { coluna: "ids_setor_primario", texto: '' },
  { coluna: "ids_setor_secundario", texto: '' }];

  displayedColumns: string[] = ['cliente', 'valor', 'pagamento_em', 'pago', 'acoes'];
  dataSource = ELEMENT_DATA;

  vendas = [];

  constructor(private apiService: ApiService, private authService: AuthService, private dialogService: DialogService, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.montaTabela();
  }

  montaTabela() {
    let dadosTabela: Vendas[] = []
    this.dialogService.showLoading();
    this.apiService.getVendas(this.authService.token).subscribe(response => {
      this.dialogService.closeAll();
      dadosTabela = response.results;
      ELEMENT_DATA = dadosTabela;
      this.atualizaTabela();

    }, error => {
      this.dialogService.closeAll();
      this.dialogService.showError("Erro ao obter dados das pessoas!", "Erro");
    });
  }

  atualizaTabela() {
    this.dataSource = ELEMENT_DATA;
  }


  createVenda() {
    this.dialog.open(ModalCriarVendaComponent, {
    });
  }
  onEnter(e) {
    //this.pesquisaCampos[0].texto = e.value.id
    //    this.projetoTableChild.onChange();
  }
  onClean() {
    /*
    this.disableFiltroRapido = true;
    this.pesquisaCampos.forEach(e => {
      e.texto = "";
    });
    this.tipo_filtro = [];
    this.fase_filtro = [];
    this.filterAdvancedForm.patchValue({
      situacao_filtro: [],
      setorp_selecionados: [],
      setors_selecionados: []
    })
    this.onChange();
    */
  }

  onChange() {
    // this.projetoTableChild.onChange();
  }

  limpaCampoPesquisa() {
    this.pesquisaCampos[0].texto = '';
    this.onChange();
  }

  onView(id: string) {
    this.dialog.open(ModalVisualizarVendasComponent, {
      data: {
        idVenda: id,
      }
    });
  }

  onUpdate(id: string) {
    this.dialog.open(ModalAtualizarVendasComponent, {
      data: {
        idVenda: id,
      }
    });
  }

  onDelete(id: string, name: string) {
    this.dialogService.showConfirmWaring('Excluir Venda', 'Tem certeza que deseja excluir a venda? ela será excluída permanentemente.').then(result => {
      if (result.value == true) {
        this.dialogService.showLoading();
        this.apiService.deletaVenda(id,this.authService.token).subscribe(response => {
          this.dialogService.closeAll();
          this.dialogService.showSuccess(`Venda Deletada com sucesso!`, "Venda Deletada!").then(result => {
            this.router.navigateByUrl('/vendas').then(success => location.reload())
          });
        },
          error => {
            this.dialogService.closeAll();
            this.dialogService.showError(`${error.error.error}`, "Erro ao Excluir Venda!")
          })
      }
    });
  }
}
