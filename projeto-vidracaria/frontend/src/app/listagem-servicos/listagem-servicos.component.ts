import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../shared/services/api.service'
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCriarServicoComponent } from '../modais/modal-criar-servico/modal-criar-servico.component';
import { ModalVisualizarServicosComponent } from '../modais/modal-visualizar-servicos/modal-visualizar-servicos.component';
import { ModalAtualizarServicosComponent } from '../modais/modal-atualizar-servicos/modal-atualizar-servicos.component';
import { Servico } from '../classes/servico.class';
export interface PeriodicElement {
  cliente: string;
  data: string;
  local: string;
  tipo: string;
}

let ELEMENT_DATA: Servico[] = []

@Component({
  selector: 'app-listagem-servicos',
  templateUrl: './listagem-servicos.component.html',
  styleUrls: ['./listagem-servicos.component.scss']
})
export class ListagemServicosComponent implements OnInit {

  pesquisaCampos = [{ coluna: '', texto: '' },
  { coluna: 'codigo', texto: '' },
  { coluna: 'nome', texto: '' },
  { coluna: 'situacao', texto: '' },
  { coluna: 'tipo', texto: '' },
  { coluna: 'bairro', texto: '' },
  { coluna: 'fase', texto: '' },
  { coluna: "ids_setor_primario", texto: '' },
  { coluna: "ids_setor_secundario", texto: '' }];

  displayedColumns: string[] = ['cliente', 'data', 'local', 'tipo', 'acoes'];
  dataSource = ELEMENT_DATA;

  constructor(private apiService: ApiService, private authService: AuthService, private dialogService: DialogService, private router: Router,
    public dialog: MatDialog) { }

    ngOnInit(): void {
      this.montaTabela();
    }
  
    montaTabela() {
      let dadosTabela: Servico[] = []
      this.dialogService.showLoading();
      this.apiService.getServicos(this.authService.token).subscribe(response => {
        console.log(response.results)
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

  createServico() {
    this.dialog.open(ModalCriarServicoComponent, {
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
    this.dialog.open(ModalVisualizarServicosComponent, {
      data: {
        idServico: id,
      },
      panelClass: 'custom-dialog-container'
    });
  }

  onUpdate(id: string) {
    this.dialog.open(ModalAtualizarServicosComponent, {
      data: {
        idServico: id,
      }
    });
  }

  onDelete(id: string, name: string) {
    this.dialogService.showConfirmWaring('Excluir Serviço', 'Tem certeza que deseja excluir o serviço? ele será excluído permanentemente.').then(result => {
      if (result.value == true) {
        this.dialogService.showLoading();
        this.apiService.deletaServico(id,this.authService.token).subscribe(response => {
          this.dialogService.closeAll();
          this.dialogService.showSuccess(`Serviço Deletado com sucesso!`, "Serviço Deletado!").then(result => {
            this.router.navigateByUrl('/servicos').then(success => location.reload())
          });
        },
          error => {
            this.dialogService.closeAll();
            this.dialogService.showError(`${error.error.error}`, "Erro ao Excluir Serviço!")
          })
      }
    });
  }
}
