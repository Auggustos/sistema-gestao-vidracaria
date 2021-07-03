import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | undefined>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
  save(customer: Customer): Promise<Customer>;
  delete(customer: Customer): Promise<Customer>;
}
