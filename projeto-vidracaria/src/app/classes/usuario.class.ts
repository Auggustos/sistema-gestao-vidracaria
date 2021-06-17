export class Usuario {
    id: string;
    nome: string;
    sobrenome: string;
    endereco: string;
    celular: string;
    email: string;
    usuario: string;
    senha: string;
    perfil: number;
    pagamento_cartao?: boolean;
    constructor(id, nome, sobrenome, endereco, celular, email, usuario, senha, perfil, pagamento_cartao) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.endereco = endereco;
        this.celular = celular;
        this.email = email;
        this.usuario = usuario;
        this.senha = senha;
        this.perfil = perfil;
        this.pagamento_cartao = pagamento_cartao;
    }

}