import { injectable, inject } from 'tsyringe';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class ListCostumersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.findAll();

    return customers;
  }
}

export default ListCostumersService;
