import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


export interface PeriodicElement {
  nome: string;
  contato: string;
  tipo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nome: "Marcio da Silva", contato: '(35)9 91919191', tipo: 'Cliente'},
  {nome: "Andrea Siqueira de Paula", contato: '(35)9 92929292', tipo: 'Fornecedor'},
];

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  openList() {
    this.router.navigateByUrl('/projeto-v2/create').then();
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
