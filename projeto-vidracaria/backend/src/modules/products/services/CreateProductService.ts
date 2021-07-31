import Product from '@modules/products/infra/typeorm/entities/Product';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  description: string;
  imageFileName: any;
  quantity: number;
  name: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({
    description,
    imageFileName,
    quantity,
    name,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      description,
      imageFileName,
      quantity,
      name,
    });

    if (quantity < 0) {
      throw new AppError(
        'Não é possível criar um produto com quantidade negativa.'
      );
    }

    const filename = await this.storageProvider.saveFile(imageFileName);

    product.image = filename

    await this.productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
