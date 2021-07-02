import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import SalesRepository from '@modules/sales/infra/typeorm/repositories/SalesRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

// <IProductsRepository> garante que o tipo de ProductsRepository seja do IProductsRepository

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  SalesRepository
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);
