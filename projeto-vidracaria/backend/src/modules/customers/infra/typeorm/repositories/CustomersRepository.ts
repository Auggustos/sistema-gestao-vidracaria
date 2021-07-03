import { getRepository, Repository } from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { id },
    });

    return customer;
  }

  public async findAll(): Promise<Customer[]> {
    const customers = await this.ormRepository.find({});

    return customers;
  }

  public async create(customerData: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create(customerData);

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }

  public async delete(customer: Customer): Promise<Customer> {
    return this.ormRepository.softRemove(customer);
  }
}

export default CustomersRepository;
