import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import IServicesRepository from '@modules/services/repositories/IServicesRepository';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import SalesRepository from '@modules/sales/infra/typeorm/repositories/SalesRepository';
import ServicesRepository from '@modules/services/infra/typeorm/repositories/ServicesRepository';


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

container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  SalesRepository
);

container.registerSingleton<IServicesRepository>(
  'ServicesRepository',
  ServicesRepository
);