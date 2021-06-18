import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from "@angular/router";
import { Produto } from '../classes/produto.class';
import { ApiService } from '../shared/services/api.service'
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCriarServicoComponent } from '../modais/modal-criar-servico/modal-criar-servico.component';
export interface PeriodicElement {
  cliente: string;
  data: string;
  local: string;
  tipo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {cliente: "Marcio da Silva", data: '06/06/21', local: "Avenida luiz correa cardoso nº 234 -  Turquia", tipo: 'Serviço'},
  {cliente: "Andrea Siqueira de Paula", data: '15/06/21', local: "Avenida luiz correa cardoso nº 234 -  Turquia", tipo: 'Orçamento'},
];

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

  displayedColumns: string[] = ['cliente', 'data', 'local', 'tipo','acoes'];
  dataSource = ELEMENT_DATA;
  
  constructor(private apiService: ApiService, private authService: AuthService, private dialogService: DialogService, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
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

}