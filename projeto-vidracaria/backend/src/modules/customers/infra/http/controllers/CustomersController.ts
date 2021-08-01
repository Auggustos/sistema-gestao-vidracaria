import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '@modules/customers/services/CreateCostumerService';
import ListCostumersService from '@modules/customers/services/ListCostumersService';
import ShowCostumerService from '@modules/customers/services/ShowCostumerService';
import SoftDeleteCostumerService from '@modules/customers/services/SoftDeleteCostumerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import { classToClass } from 'class-transformer';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, phone, address, type } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      phone,
      address,
      type,
    });

    return response.json(customer);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListCostumersService);

    const products = await listProducts.execute();

    return response.json({ results: products });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCostumer = container.resolve(ShowCostumerService);

    const costumer = await showCostumer.execute(id);

    return response.json(costumer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCostumer = container.resolve(SoftDeleteCostumerService);

    const costumer = await deleteCostumer.execute({
      id,
    });

    return response.json(costumer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, phone, type } = request.body;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      id,
      name,
      phone,
      type
    });

    return response.json(classToClass(customer));
  }
}
