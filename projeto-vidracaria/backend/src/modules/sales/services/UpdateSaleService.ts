import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISalesRepository from '../repositories/ISalesRepository';

import Sale from '../infra/typeorm/entities/Sale';

/* interface IRequest {
  id: string;
} */

interface IRequestDTO {
    id: string;
    customer_id: string;
    value: number;
    itens: string;
    payment_type: number;
    paid: number;
}

@injectable()
export default class UpdateSaleService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ) { }

    public async execute({
        id,
        customer_id,
        value,
        itens,
        payment_type,
        paid
    }: IRequestDTO): Promise<Sale> {
        const sale = await this.salesRepository.findById(id);

        if (!sale) {
            throw new AppError('Venda não encontrada.');
        }



        sale.customer_id = customer_id;
        sale.value = value;
        sale.itens = itens;
        sale.payment_type = payment_type
        sale.paid = paid;

        return this.salesRepository.save(sale);
    }
}
