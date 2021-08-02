import { getRepository, Repository } from 'typeorm';
import Service from '@modules/services/infra/typeorm/entities/Service';

import IServicesRepository from '@modules/services/repositories/IServicesRepository';
import ICreateServiceDTO from '@modules/services/dtos/ICreateServiceDTO';

interface IRequest {
    customer_id: string;
    date: Date;
    place: string;
    type: number;
    value: number;
    status: number;
}
class ServicesRepository implements IServicesRepository {
    private ormRepository: Repository<Service>;

    constructor() {
        this.ormRepository = getRepository(Service);
    }

    public async findById(id: string): Promise<Service | undefined> {
        const service = await this.ormRepository.findOne({
            where: { id },
            relations: ['customer'],
        });

        return service;
    }

    public async findAll(): Promise<Service[]> {
        const services = await this.ormRepository.find({
            relations: ['customer'],
        });

        return services;
    }

    public async create(serviceData: ICreateServiceDTO): Promise<Service> {
        const service = this.ormRepository.create(serviceData);

        await this.ormRepository.save(service);

        return service;
    }

    public async save(service: Service): Promise<Service> {
        return this.ormRepository.save(service);
    }

    public async delete(service: Service): Promise<Service> {
        return this.ormRepository.softRemove(service);
    }
}

export default ServicesRepository;
