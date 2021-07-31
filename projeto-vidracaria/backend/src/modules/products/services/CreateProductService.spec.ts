import CreateProductService from '@modules/products/services/CreateProductService';
import FakeProductsRepository from '@modules/products/infra/typeorm/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let fakeStorageProvider: FakeStorageProvider;
describe('Product :: CreateProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createProduct = new CreateProductService(fakeProductsRepository, fakeStorageProvider);
  });

  it('should be able to create', async () => {
    /*
    await User.create({
      name: 'Test',
      email: 'test@example.com',
      password: bcrypt.hashSync('testpass', 4),
    }); */

    const result = await createProduct.execute({
      name: 'Box blindado',
      description: 'Box blindado com espessura 300mm',
      quantity: 6,
      imageFileName:
        'http://windowsbulletin.com/wp-content/uploads/2020/07/How-to-Get-the-Size-of-an-Amazon-S3-Bucket.png',
    });

    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('quantity');
    expect(result).toHaveProperty('imageFileName');
  });

  it('should not be able create the product with quantity < 0', async () => {
    expect(
      createProduct.execute({
        name: 'Box blindado',
        description: 'Box blindado com espessura 300mm',
        quantity: 6,
        imageFileName:
          'http://windowsbulletin.com/wp-content/uploads/2020/07/How-to-Get-the-Size-of-an-Amazon-S3-Bucket.png',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
