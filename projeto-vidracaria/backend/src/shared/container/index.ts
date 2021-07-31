import { container } from 'tsyringe';

import '@modules/users/providers';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';


// <IProductsRepository> garante que o tipo de ProductsRepository seja do IProductsRepository

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
