import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequestDTO {
  id: string;
}

@injectable()
export default class SoftDeleteProductService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ id }: IRequestDTO): Promise<Customer> {
    const product = await this.customersRepository.findById(id);

    if (!product) {
      throw new AppError('Cliente não encontrado.');
    }

    return this.customersRepository.delete(product);
  }
}
