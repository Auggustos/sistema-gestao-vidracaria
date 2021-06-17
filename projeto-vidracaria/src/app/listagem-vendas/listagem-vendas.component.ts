import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

export interface PeriodicElement {
  cliente: string;
  valor: number;
  pagamento_em: string;
  pago: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {cliente: "Marcio da Silva", valor: 820, pagamento_em: "Dinheiro", pago: 'Sim'},
  {cliente: "Andrea Siqueira de Paula", valor: 430, pagamento_em: "Cartão", pago: 'Não'},
];

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

  displayedColumns: string[] = ['cliente', 'valor', 'pagamento_em', 'pago','acoes'];
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
