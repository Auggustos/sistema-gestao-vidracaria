import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IServicesRepository from '../repositories/IServicesRepository';

import Service from '../infra/typeorm/entities/Service';

/* interface IRequest {
  id: string;
} */

@injectable()
export default class ShowSaleService {
    constructor(
        @inject('ServicesRepository')
        private servicesRepository: IServicesRepository
    ) { }

    public async execute(id: string): Promise<Service> {
        const sale = await this.servicesRepository.findById(id);

        if (!sale) {
            throw new AppError('Venda não encontrada.', 404);
        }

        return sale;
    }
}
