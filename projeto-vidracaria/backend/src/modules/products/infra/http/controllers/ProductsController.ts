import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import ShowProductService from '@modules/products/services/ShowProductService';
import SoftDeleteProductService from '@modules/products/services/SoftDeleteProductService';
import { classToClass } from 'class-transformer';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, quantity, name } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      description,
      imageFileName: request.file.filename,
      quantity,
      name,
    });

    return response.json(classToClass(product));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return response.json({ results: products });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute(id);

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = container.resolve(SoftDeleteProductService);

    const product = await deleteProduct.execute({
      id,
    });

    return response.json(product);
  }
}
