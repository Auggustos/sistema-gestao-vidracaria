import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }
    public async execute({ name, email, password }: IRequest): Promise<User> {
        console.log(name)
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError("Email address already used");
        }

        const hashedPassword = await this.hashProvider.generateHash(password)
        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        return user;
    }
}

export default CreateUserService;