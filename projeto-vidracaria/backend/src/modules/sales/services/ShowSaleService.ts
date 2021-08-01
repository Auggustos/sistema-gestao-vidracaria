import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISalesRepository from '../repositories/ISalesRepository';

import Sale from '../infra/typeorm/entities/Sale';

/* interface IRequest {
  id: string;
} */

@injectable()
export default class ShowSaleService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ) { }

    public async execute(id: string): Promise<Sale> {
        const sale = await this.salesRepository.findById(id);

        if (!sale) {
            throw new AppError('Venda não encontrada.', 404);
        }

        return sale;
    }
}
