import { injectable, inject } from 'tsyringe';
import Sale from '../infra/typeorm/entities/Sale';
import ISalesRepository from '../repositories/ISalesRepository';

interface IRequest {
  costumerId: string;
  value: number;
  date: Date;
  itens: string;
  type: number;
  payedWith: number;
}
@injectable()
class CreateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) {}

  public async execute({
    costumerId,
    value,
    date,
    itens,
    type,
    payedWith,
  }: IRequest): Promise<Sale> {
    const sale = await this.salesRepository.create({
      costumerId,
      value,
      date,
      itens,
      type,
      payedWith,
    });

    return sale;
  }
}

export default CreateSaleService;
