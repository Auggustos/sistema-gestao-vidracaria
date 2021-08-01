import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IServicesRepository from '../repositories/IServicesRepository';
import Service from '../infra/typeorm/entities/Service';

interface IRequestDTO {
    id: string;
}

@injectable()
export default class SoftDeleteSaleService {
    constructor(
        @inject('ServicesRepository')
        private servicesRepository: IServicesRepository
    ) { }

    public async execute({ id }: IRequestDTO): Promise<Service> {
        const service = await this.servicesRepository.findById(id);

        if (!service) {
            throw new AppError('Serviço não encontrado.');
        }

        return this.servicesRepository.delete(service);
    }
}
