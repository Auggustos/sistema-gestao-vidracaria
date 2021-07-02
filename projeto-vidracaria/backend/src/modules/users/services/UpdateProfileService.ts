import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  id: string;
  nome: string;
  sobrenome: string;
  endereco: string;
  celular: string;
  email: string;
  senha_antiga: string;
  senha: string;
  perfil: number;
  pagamento_cartao: boolean;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    id,
    nome,
    sobrenome,
    endereco,
    celular,
    email,
    senha_antiga,
    senha,
    perfil,
    pagamento_cartao,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail && checkEmail.id !== id) {
      throw new AppError(
        'Esse email está sendo utilizado atualmente por outro usuário.'
      );
    }

    if (!senha_antiga) {
      throw new AppError('Você precisa informar sua senha atual.');
    }

    if (senha_antiga) {
      const checkOldPassword = await compare(senha_antiga, user.senha);

      if (!checkOldPassword) {
        throw new AppError('Senha atual incorreta.');
      }
    }

    if (senha && senha_antiga) {
      user.senha = await await hash(senha, 8);
    }

    user.nome = nome;
    user.sobrenome = sobrenome;
    user.endereco = endereco;
    user.celular = celular;
    user.email = email;
    user.perfil = perfil;
    user.pagamento_cartao = pagamento_cartao;

    return this.usersRepository.save(user);
  }
}
