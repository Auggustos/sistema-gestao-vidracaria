import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { injectable, inject } from 'tsyringe';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  phone: string;
  address: string;
  type: number;
}

@injectable()
class CreateCostumerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({
    name,
    phone,
    address,
    type,
  }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.create({
      name,
      phone,
      address,
      type,
    });

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default CreateCostumerService;
