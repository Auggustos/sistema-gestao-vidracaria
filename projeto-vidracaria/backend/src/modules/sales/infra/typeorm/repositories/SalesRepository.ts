import { getRepository, Repository } from 'typeorm';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';

interface IRequest {
    customer_id: string;
    value: string;
    itens: string;
    payment_type: number;
    paid: number;
}
class SalesRepository implements ISalesRepository {
    private ormRepository: Repository<Sale>;

    constructor() {
        this.ormRepository = getRepository(Sale);
    }

    public async findById(id: string): Promise<Sale | undefined> {
        const sale = await this.ormRepository.findOne({
            where: { id },
            relations: ['customer'],
        });

        return sale;
    }

    public async findAll(): Promise<Sale[]> {
        const sales = await this.ormRepository.find({
            relations: ['customer'],
        });

        return sales;
    }

    public async create(saleData: ICreateSaleDTO): Promise<Sale> {
        const sale = this.ormRepository.create(saleData);

        await this.ormRepository.save(sale);

        return sale;
    }

    public async save(sale: Sale): Promise<Sale> {
        return this.ormRepository.save(sale);
    }

    public async delete(sale: Sale): Promise<Sale> {
        return this.ormRepository.softRemove(sale);
    }
}

export default SalesRepository;
