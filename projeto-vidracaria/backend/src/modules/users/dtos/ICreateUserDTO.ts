export default interface ICreateUserDTO {
  nome: string;
  sobrenome: string;
  endereco: string;
  celular: string;
  email: string;
  usuario: string;
  senha: string;
  perfil: number;
  pagamento_cartao: boolean;
}
