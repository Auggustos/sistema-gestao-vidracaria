import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IServicesRepository from '../repositories/IServicesRepository';

import Service from '../infra/typeorm/entities/Service';

/* interface IRequest {
  id: string;
} */

interface IRequestDTO {
    id: string;
    customer_id: string;
    date: string;
    place: string;
    type: number;
    value: number;
    status: number;
}

@injectable()
export default class UpdateSaleService {
    constructor(
        @inject('ServicesRepository')
        private servicesRepository: IServicesRepository
    ) { }

    public async execute({
        id,
        customer_id,
        date,
        place,
        type,
        value,
        status,
    }: IRequestDTO): Promise<Service> {
        const service = await this.servicesRepository.findById(id);

        if (!service) {
            throw new AppError('Venda não encontrada.');
        }



        service.customer_id = customer_id;
        service.value = value;
        service.type = type
        service.place = place;
        service.status = status;

        return this.servicesRepository.save(service);
    }
}
