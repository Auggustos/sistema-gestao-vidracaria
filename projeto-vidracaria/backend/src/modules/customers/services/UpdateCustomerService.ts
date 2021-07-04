import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

import Customer from '../infra/typeorm/entities/Customer';

interface IRequestDTO {
  id: string;
  name: string;
  phone: string;
  type: number;
}

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({
    id,
    name,
    phone,
    type,
  }: IRequestDTO): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado.');
    }

    customer.name = name;
    customer.phone = phone;
    customer.type = type;

    return this.customersRepository.save(customer);
  }
}
