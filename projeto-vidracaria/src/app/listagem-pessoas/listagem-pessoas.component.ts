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

  pesquisaCampos = [{ coluna: '', texto: '' },
  { coluna: 'codigo', texto: '' },
  { coluna: 'nome', texto: '' },
  { coluna: 'situacao', texto: '' },
  { coluna: 'tipo', texto: '' },
  { coluna: 'bairro', texto: '' },
  { coluna: 'fase', texto: '' },
  { coluna: "ids_setor_primario", texto: '' },
  { coluna: "ids_setor_secundario", texto: '' }];

  displayedColumns: string[] = ['nome', 'contato', 'tipo','acoes'];
  dataSource = ELEMENT_DATA;

  constructor(private apiService: ApiService, private authService: AuthService, private dialogService: DialogService, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.montaTabela();
  }
  createPessoa() {
    this.dialog.open(ModalCriarPessoaComponent, {
    });
  }
  montaTabela() {

    let dadosTabela : Pessoa[] = []
    this.apiService.getPessoas().subscribe(response =>{
      dadosTabela = response.results;
      ELEMENT_DATA = dadosTabela;
      this.atualizaTabela();     

    }, error => {
      this.dialogService.showError("Erro ao obter dados das pessoas!","Erro");
    });
  }

  atualizaTabela() {
    this.dataSource = ELEMENT_DATA;
  }

  onChange() {
   // this.projetoTableChild.onChange();
  }

  onView(id: string){
    this.dialog.open(ModalVisualizarPessoaComponent, {
      data: {
        idPessoa: id,
      }
    });
  }
  onDelete(id: string,name:string){
    this.dialogService.showConfirm('Excluir pessoa', 'Deseja excluir a pessoa?').then(result =>{
      if(result.value == true){
        this.apiService.deletaPessoa(id).subscribe(response =>{
            this.dialogService.showSuccess(`${name} Deletado(a) com sucesso!`, "Pessoa Deletado!").then(result => {
            this.router.navigateByUrl('').then(success => location.reload())
            });
        },
          error =>{
            this.dialogService.showError(`${error.error.error}`, "Erro ao Excluir Pessoa!")
          })
      }
    });
  }
  onEdit(id: string){
    //inserir aqui
  }

  limpaCampoPesquisa() {
    this.pesquisaCampos[0].texto = '';
    this.onChange();
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
}
