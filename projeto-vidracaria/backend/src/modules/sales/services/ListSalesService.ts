import { injectable, inject } from 'tsyringe';
import Sale from '../infra/typeorm/entities/Sale';
import ISalesRepository from '../repositories/ISalesRepository';

@injectable()
class ListSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ) { }

    public async execute(): Promise<Sale[]> {
        const sales = await this.salesRepository.findAll();

        return sales;
    }
}

export default ListSalesService;
