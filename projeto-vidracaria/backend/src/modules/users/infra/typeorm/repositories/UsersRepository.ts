import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }


  public async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne({
          where: {email}
      });

      return user;
  }



  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async create(user: User): Promise<User> {
      return this.ormRepository.create(user)
  }


}

export default UsersRepository;
