import { getRepository, Repository } from 'typeorm';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';

class SalesRepository implements ISalesRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async findAll(): Promise<Sale[]> {
    const user = await this.ormRepository.find();

    return user;
  }

  public async findById(id: string): Promise<Sale | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async create(userData: ICreateSaleDTO): Promise<Sale> {
    const sale = this.ormRepository.create(userData);

    await this.ormRepository.save(sale);

    return sale;
  }

  public async save(user: Sale): Promise<Sale> {
    return this.ormRepository.save(user);
  }

  public async delete(user: Sale): Promise<Sale> {
    this.ormRepository.delete(user);

    return user;
  }
}

export default SalesRepository;
