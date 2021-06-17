import { PedidoProduto } from './pedidoProduto.class';

export class Pedido {
    id: string;
    id_pedido: string;
    id_produto: string;
    quantidade: number;
    status: number;
    criado_em: Date;
    atualizado_em: Date;
    pedido_produto: PedidoProduto[];
    valor:number;
    constructor(id, id_pedido, id_produto, quantidade, status, criado_em, atualizado_em, pedido_produto) {
        this.id = id;
        this.id_pedido = id_pedido;
        this.id_produto = id_produto;
        this.quantidade = quantidade;
        this.status = status;
        this.criado_em = criado_em;
        this.atualizado_em = atualizado_em;
        this.pedido_produto = pedido_produto;
    }
}