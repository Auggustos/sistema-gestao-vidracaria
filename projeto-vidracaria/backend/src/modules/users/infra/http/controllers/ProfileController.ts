import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute(id);
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      nome,
      sobrenome,
      endereco,
      celular,
      email,
      senha_antiga,
      senha,
      perfil,
      pagamento_cartao,
    } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
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
    });

    delete user.senha;

    return response.json(user);
  }
}
