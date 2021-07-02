import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  nome: string;
  sobrenome: string;
  endereco: string;
  celular: string;
  email: string;
  usuario: string;
  senha?: string;
  perfil: number;
  pagamento_cartao: boolean;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    nome,
    sobrenome,
    endereco,
    celular,
    email,
    usuario,
    senha,
    perfil,
    pagamento_cartao,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByUser(usuario);

    const checkEmailExists = await this.usersRepository.findByUser(email);

    if (checkUserExists) {
      throw new AppError('Usuário já está sendo utilizado');
    }

    if (checkEmailExists) {
      throw new AppError('Email já está sendo utilizado');
    }

    if (!senha) {
      throw new AppError('Você não informou a senha');
    }

    const hashedPassword = await hash(senha, 8);
    const user = await this.usersRepository.create({
      nome,
      sobrenome,
      endereco,
      celular,
      email,
      usuario,
      senha: hashedPassword,
      perfil,
      pagamento_cartao,
    });

    return user;
  }
}

export default CreateUserService;
