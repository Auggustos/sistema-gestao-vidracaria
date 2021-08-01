import Service from '@modules/services/infra/typeorm/entities/Service';
import AppError from '@shared/errors/AppError';
import { startOfHour, isBefore } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import IServicesRepository from '../repositories/IServicesRepository';

interface IRequest {
    customer_id: string;
    date: Date;
    place: string;
    type: number;
    value: number;
    status: number;
}

@injectable()
class CreateSaleService {
    constructor(
        @inject('ServicesRepository')
        private servicesRepository: IServicesRepository
    ) { }

    public async execute({
        customer_id,
        date,
        place,
        type,
        value,
        status,

    }: IRequest): Promise<Service> {
        const serviceDate = startOfHour(date)

        if (isBefore(serviceDate, Date.now())) {
            throw new AppError("Você não pode criar um serviço com data passada.");
        }

        const service = await this.servicesRepository.create({
            customer_id,
            date: serviceDate,
            place,
            type,
            value,
            status,

        });



        await this.servicesRepository.save(service);

        return service;
    }
}

export default CreateSaleService;
