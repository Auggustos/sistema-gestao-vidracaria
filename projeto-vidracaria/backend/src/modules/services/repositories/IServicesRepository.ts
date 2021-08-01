import Service from '../infra/typeorm/entities/Service';
import ICreateServiceDTO from '../dtos/ICreateServiceDTO';


export default interface IServicesRepository {
    findAll(): Promise<Service[]>;
    findById(id: string): Promise<Service | undefined>;
    create(data: ICreateServiceDTO): Promise<Service>;
    save(sale: Service): Promise<Service>;
    delete(sale: Service): Promise<Service>;
}
