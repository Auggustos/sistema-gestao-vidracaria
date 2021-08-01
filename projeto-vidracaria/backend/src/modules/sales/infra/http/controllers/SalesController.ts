import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import ListSalesService from '@modules/sales/services/ListSalesService';
import CreateSaleService from '@modules/sales/services/CreateSaleService';
import ShowSaleService from '@modules/sales/services/ShowSaleService';
import SoftDeleteSaleService from '@modules/sales/services/SoftDeleteSaleService';
import UpdateSaleService from '@modules/sales/services/UpdateSaleService';


export default class SalesController {


    public async index(request: Request, response: Response): Promise<Response> {
        const listSales = container.resolve(ListSalesService);

        const sales = await listSales.execute();

        return response.json({ results: classToClass(sales) });
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { customer_id,
            itens,
            paid,
            payment_type,
            value } = request.body;

        const createSale = container.resolve(CreateSaleService);

        const customer = await createSale.execute({
            customer_id,
            itens,
            paid,
            payment_type,
            value,
        });

        return response.json(customer);
    }


    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showSale = container.resolve(ShowSaleService);

        const sale = await showSale.execute(id);

        return response.json(classToClass(sale));
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteSale = container.resolve(SoftDeleteSaleService);

        const sale = await deleteSale.execute({
            id,
        });

        return response.json(classToClass(sale));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {
            id,
            customer_id,
            value,
            itens,
            payment_type,
            paid } = request.body;

        const updateSale = container.resolve(UpdateSaleService);

        const sale = await updateSale.execute({
            id,
            customer_id,
            value,
            itens,
            payment_type,
            paid
        });

        return response.json(classToClass(sale));
    }





}
