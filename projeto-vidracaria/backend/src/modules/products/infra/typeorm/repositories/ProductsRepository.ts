import { getRepository, Repository } from 'typeorm';
import Product from '@modules/products/infra/typeorm/entities/Product';

import IProductRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

class ProductsRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
    });

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find({});

    return products;
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(product: Product): Promise<Product> {
    return this.ormRepository.softRemove(product);
  }
}

export default ProductsRepository;
