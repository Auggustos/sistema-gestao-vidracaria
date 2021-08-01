import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISalesRepository from '../repositories/ISalesRepository';
import Sale from '../infra/typeorm/entities/Sale';

interface IRequestDTO {
    id: string;
}

@injectable()
export default class SoftDeleteSaleService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ) { }

    public async execute({ id }: IRequestDTO): Promise<Sale> {
        const product = await this.salesRepository.findById(id);

        if (!product) {
            throw new AppError('Venda não encontrada.');
        }

        return this.salesRepository.delete(product);
    }
}
