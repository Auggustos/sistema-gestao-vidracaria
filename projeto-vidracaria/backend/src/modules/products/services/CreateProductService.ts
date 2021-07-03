import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  description: string;
  imageUrl: string;
  quantity: number;
  name: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    description,
    imageUrl,
    quantity,
    name,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      description,
      imageUrl,
      quantity,
      name,
    });

    if (quantity < 0) {
      throw new AppError(
        'Não é possível criar um produto com quantidade negativa.'
      );
    }

    await this.productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
