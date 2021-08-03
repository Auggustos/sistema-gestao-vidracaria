import { uuid } from 'uuidv4';

import ICreateServiceDTO from '@modules/services/dtos/ICreateServiceDTO';

import Service from '@modules/services/infra/typeorm/entities/Service';
import IServicesRepository from '@modules/services/repositories/IServicesRepository';

class FakeServicesRepository implements IServicesRepository {
    private services: Service[] = [];

    public async findAll(): Promise<Service[]> {
        const { services } = this;

        return services;
    }

    public async findById(id: string): Promise<Service | undefined> {
        const findService = this.services.find(service => service.id === id);

        return findService;
    }

    public async create(serviceData: ICreateServiceDTO): Promise<Service> {
        const service = new Service();

        Object.assign(service, { id: uuid() }, serviceData);

        this.services.push(service);

        return service;
    }

    public async save(service: Service): Promise<Service> {
        const findIndex = this.services.findIndex(
            findService => findService.id === service.id
        );

        this.services[findIndex] = service;

        return service;
    }

    public async delete(service: Service): Promise<Service> {
        const findIndex = this.services.findIndex(
            findService => findService.id === service.id
        );

        this.services[findIndex] = service;

        return service;
    }
}

export default FakeServicesRepository;
