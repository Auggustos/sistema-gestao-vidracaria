import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import { injectable, inject } from 'tsyringe';
import ISalesRepository from '../repositories/ISalesRepository';

interface IRequest {
    customer_id: string;
    value: number;
    itens: string;
    payment_type: number;
    paid: number;
}

@injectable()
class CreateSaleService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ) { }

    public async execute({
        customer_id,
        value,
        itens,
        payment_type,
        paid,
    }: IRequest): Promise<Sale> {
        const sale = await this.salesRepository.create({
            customer_id,
            value,
            itens,
            payment_type,
            paid,
        });

        await this.salesRepository.save(sale);

        return sale;
    }
}

export default CreateSaleService;
