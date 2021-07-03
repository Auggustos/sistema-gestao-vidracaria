import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

/* interface IRequest {
  id: string;
} */

interface IRequestDTO {
  id: string;
  description: string;
  name: string;
  quantity: number;
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    id,
    description,
    name,
    quantity,
  }: IRequestDTO): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado.');
    }
    /*
    if (product.id_usuario !== user_id) {
      throw new AppError('Você não pode atualizar esse produto');
    } */

    product.description = description;
    product.name = name;
    product.quantity = quantity;

    return this.productsRepository.save(product);
  }
}
