import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateSaleService from '@modules/sales/services/CreateSaleService';

export default class SalesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { costumerId, value, date, itens, type, payedWith } = request.body;

    const createSale = container.resolve(CreateSaleService);

    const sale = await createSale.execute({
      costumerId,
      value,
      date,
      itens,
      type,
      payedWith,
    });

    return response.json(sale);
  }
}
