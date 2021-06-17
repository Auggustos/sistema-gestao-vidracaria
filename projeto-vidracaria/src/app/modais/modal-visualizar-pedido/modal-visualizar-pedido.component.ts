import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PedidoProduto } from 'src/app/classes/pedidoProduto.class';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';

export interface ItemPedido {
  nome: string,
  descricao: string,
  valor: number,
  quantidade: number,
}

let ELEMENT_DATA: PedidoProduto[] = []

@Component({
  selector: 'app-modal-visualizar-pedido',
  templateUrl: './modal-visualizar-pedido.component.html',
  styleUrls: ['./modal-visualizar-pedido.component.css']
})
export class ModalVisualizarPedidoComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns = ['Nome', 'Descrição', 'Valor', 'Status', 'Quantidade'];
  displayedColumns1 = ['Nome', 'Descrição', 'Valor', 'Status', 'Quantidade', 'Ações'];

  status;

  statusPedido: { id: String, status: number }[] = [];
  situacaoPedido = [{ id: 0, nome: 'Em Análise' }, { id: 1, nome: 'Em Rota de entrega' }, { id: 2, nome: 'Entregue' }, { id: 3, nome: 'Não Disponível' }];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    if (this.data.vendedor) {
      ELEMENT_DATA = this.data.pedidoProdutos;
      this.atualizaTabela();
    } else {
      ELEMENT_DATA = this.data.pedidoProduto;
      this.atualizaTabela();
    }
  }

  goBack() {
    window.history.back();
  }
  atualizaTabela() {
    this.dataSource = ELEMENT_DATA;
  }
  onChangeStatus(idProduto, status) {
    let flag = 0;
    if (this.statusPedido.length > 0) {
      for (let i = 0; i < this.statusPedido.length; i++) {
        if (this.statusPedido[i].id == idProduto) {
          flag = 1;
          if (flag == 1) {
            this.statusPedido[i].status = status;
            break;
          }
        }
      }
      if (flag == 0) {
        this.statusPedido.push({ id: idProduto, status: status });
      }
    } else {
      this.statusPedido.push({ id: idProduto, status: status });
    }
    this.status = status;
  }
  alteraStatus(idProduto) {
    this.statusPedido.forEach(sp => {
      if (idProduto == sp.id) {
        let body = {
          id: sp.id,
          status: sp.status
        }
        /*
        this.apiService.mudaStatus(body, this.authService.token).subscribe(success => {
          this.dialogService.showSuccess(`Status de pedido atualizado com sucesso!`, 'Status Atualizado!').then(result => {
            if (sp.status == 1) {
              this.dialogService.showSuccess(`Entre em contato com o cliente para combinar pagamento e entrega!`, 'Contate o Cliente!').then(result => { });
            }
          });
        },
          error => {
            this.dialogService.showError(`${error.error.message}`, "Acesso Negado!")
         });
         */
        }

    })
  }

}