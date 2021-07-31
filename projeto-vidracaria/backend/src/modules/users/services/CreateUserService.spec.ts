import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
describe('User :: CreateUserService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider,);
    });


    it('should  be able to create user', async () => {



        const user = await createUser.execute({
            name: 'Testable Person',
            email: 'testable@mail.com',
            password: '123456'
        })



        expect(user).toHaveProperty('id')

    });

    it('should not be able to create user already created', async () => {
        await createUser.execute({
            name: 'Testable Person',
            email: 'testable@mail.com',
            password: '123456'
        })

        expect(createUser.execute({
            name: 'Testable Person',
            email: 'testable@mail.com',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError)


    })

});
