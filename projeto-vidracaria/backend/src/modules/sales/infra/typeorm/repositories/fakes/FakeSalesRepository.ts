import { uuid } from 'uuidv4';

import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import ISalesRepository from '@modules/sales/repositories/ISalesRepository';

class FakeSalesRepository implements ISalesRepository {
    private sales: Sale[] = [];

    public async findAll(): Promise<Sale[]> {
        const { sales } = this;

        return sales;
    }

    public async findById(id: string): Promise<Sale | undefined> {
        const findSale = this.sales.find(sale => sale.id === id);

        return findSale;
    }

    public async create(saleData: ICreateSaleDTO): Promise<Sale> {
        const sale = new Sale();

        Object.assign(sale, { id: uuid() }, saleData);

        this.sales.push(sale);

        return sale;
    }

    public async save(sale: Sale): Promise<Sale> {
        const findIndex = this.sales.findIndex(
            findSale => findSale.id === sale.id
        );

        this.sales[findIndex] = sale;

        return sale;
    }

    public async delete(sale: Sale): Promise<Sale> {
        const findIndex = this.sales.findIndex(
            findSale => findSale.id === sale.id
        );

        this.sales[findIndex] = sale;

        return sale;
    }
}

export default FakeSalesRepository;
