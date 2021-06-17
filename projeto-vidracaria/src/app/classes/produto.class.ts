import { Usuario } from './usuario.class';

export class Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    id_usuario: string;
    quantidade: number;
    usuario: Usuario;
    constructor(id, nome, descricao, preco, imagem, id_usuario, quantidade,usuario) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.imagem = imagem;
        this.id_usuario = id_usuario;
        this.quantidade = quantidade;
        this.usuario = usuario
    }
}
