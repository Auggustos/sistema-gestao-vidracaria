import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  usuario: string;
  senha: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ usuario, senha }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUser(usuario);

    if (!user) {
      throw new AppError('Combinação de usuário / senha inválido.', 401);
    }

    // user.senha - senha criptografada
    // senha - senha não criptografada
    const passwordMatched = await compare(senha, user.senha);

    if (!passwordMatched) {
      throw new AppError('Combinação de usuário / senha inválido.', 401);
    }

    // Usuário autenticado - primeiro parametro payload informações
    // a serem enviadas e utilizadas no frontend
    // 2 parametro - chave secreta

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ perfil: user.perfil }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
