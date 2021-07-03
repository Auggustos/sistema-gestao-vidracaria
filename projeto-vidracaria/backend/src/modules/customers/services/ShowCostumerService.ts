import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

/* interface IRequest {
  id: string;
} */

@injectable()
export default class ShowProductService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado.', 404);
    }

    return customer;
  }
}
