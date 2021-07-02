import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      sobrenome,
      endereco,
      celular,
      email,
      usuario,
      senha,
      perfil,
      pagamento_cartao,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      nome,
      sobrenome,
      endereco,
      celular,
      email,
      usuario,
      senha,
      perfil,
      pagamento_cartao,
    });

    delete user.senha;

    return response.json(user);
  }
}
