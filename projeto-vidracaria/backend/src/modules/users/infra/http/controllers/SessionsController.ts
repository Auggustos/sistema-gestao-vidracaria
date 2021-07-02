// index, show, create, update, delete

import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { usuario, senha } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      usuario,
      senha,
    });

    delete user.senha;

    return response.json({ user, token });
  }
}
