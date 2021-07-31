import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
describe('User :: AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  });


  it('should  be able to authenticate with existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Testable User',
      email: 'testable@mail.com',
      password: '123456'

    });

    const response = await authenticateUser.execute({
      email: 'testable@mail.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toBe(user)
  });

  it('should NOT be able to authenticate with non existing user', async () => {


    expect(authenticateUser.execute({
      email: 'testable@email.com',
      password: 'test_password',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should  NOT be able to authenticate with existing user but wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Testable User',
      email: 'testable@mail.com',
      password: '123456'

    });

    expect(authenticateUser.execute({
      email: 'testable@mail.com',
      password: 'wrong_password'
    })).rejects.toBeInstanceOf(AppError);

  });
});
