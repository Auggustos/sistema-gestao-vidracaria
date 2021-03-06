import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from "@angular/router";
import { Pessoa } from '../classes/pessoa.class';
import { ApiService } from '../shared/services/api.service'
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCriarPessoaComponent } from '../modais/modal-criar-pessoa/modal-criar-pessoa.component';
import { ModalVisualizarPessoaComponent } from '../modais/modal-visualizar-pessoa/modal-visualizar-pessoa.component';
import { ModalAtualizarPessoasComponent } from '../modais/modal-atualizar-pessoas/modal-atualizar-pessoas.component';

export interface PeriodicElement {
  name: string;
  phone: string;
  type: number;
}

let ELEMENT_DATA: Pessoa[] = [];

@Component({
  selector: 'app-listagem-pessoas',
  templateUrl: './listagem-pessoas.component.html',
  styleUrls: ['./listagem-pessoas.component.scss']
})
export class ListagemPessoasComponent implements OnInit {

  pesquisaCampos = [{ coluna: '', texto: '' }];

  displayedColumns: string[] = ['nome', 'contato', 'tipo', 'acoes'];
  dataSource = ELEMENT_DATA;

  constructor(private apiService: ApiService, private authService: AuthService, private dialogService: DialogService, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    ELEMENT_DATA = []
    this.montaTabela();
  }
  createPessoa() {
    this.dialog.open(ModalCriarPessoaComponent, {
    });
  }
  montaTabela() {
    let dadosTabela: Pessoa[] = []
    this.dialogService.showLoading();
    this.apiService.getPessoas().subscribe(response => {
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

  onChange() {
    // this.projetoTableChild.onChange();
  }

  onView(id: string) {
    this.dialog.open(ModalVisualizarPessoaComponent, {
      data: {
        idPessoa: id,
      }
    });
  }
  onDelete(id: string, name: string) {
    this.dialogService.showConfirmWaring('Excluir pessoa', 'Tem certeza que deseja excluir a pessoa? ela ser?? exclu??da permanentemente.').then(result => {
      if (result.value == true) {
        this.dialogService.showLoading();
        this.apiService.deletaPessoa(id).subscribe(response => {
          this.dialogService.closeAll();
          this.dialogService.showSuccess(`${name} Deletado(a) com sucesso!`, "Pessoa Deletado!").then(result => {
            this.router.navigateByUrl('/pessoas').then(success => location.reload())
          });
        },
          error => {
            this.dialogService.closeAll();
            this.dialogService.showError(`${error.error.error}`, "Erro ao Excluir Pessoa!")
          })
      }
    });
  }
  onUpdate(id: string) {
    this.dialog.open(ModalAtualizarPessoasComponent, {
      data: {
        idPessoa: id,
      }
    });
  }

  limpaCampoPesquisa() {
    this.pesquisaCampos[0].texto = '';
    this.onChange();
  }

  onEnter(e) {
    let dadosTabela: Pessoa[] = []
    this.apiService.getPessoas().subscribe(response => {
      response.results.forEach(pessoa => {
        if (pessoa.name.toLowerCase().includes(this.pesquisaCampos[0].texto.toLowerCase()) || pessoa.phone.toLowerCase().includes(this.pesquisaCampos[0].texto.toLowerCase()) || pessoa.address.toLowerCase().includes(this.pesquisaCampos[0].texto.toLowerCase()) || this.pesquisaCampos[0].texto.toLowerCase() == 'cliente' ? pessoa.type == 0 : {} || this.pesquisaCampos[0].texto.toLowerCase() == 'fornecedor' ? pessoa.type == 1 : {}) {
          dadosTabela.push(pessoa);
        }
      })
      ELEMENT_DATA = dadosTabela;
      this.atualizaTabela();
    }, error => {
      this.dialogService.showError("Erro ao filtrar a lista de pessoas!", "Erro");
    });
  }
  onClean() {
    this.ngOnInit()
  }
}
