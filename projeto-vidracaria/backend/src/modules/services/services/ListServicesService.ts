import { injectable, inject } from 'tsyringe';
import Sale from '../infra/typeorm/entities/Service';
import IServicesRepository from '../repositories/IServicesRepository';

@injectable()
class ListSalesService {
    constructor(
        @inject('ServicesRepository')
        private servicesRepository: IServicesRepository
    ) { }

    public async execute(): Promise<Sale[]> {
        const sales = await this.servicesRepository.findAll();

        return sales;
    }
}

export default ListSalesService;
