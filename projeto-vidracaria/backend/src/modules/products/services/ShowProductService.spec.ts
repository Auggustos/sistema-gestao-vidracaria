import AppError from '@shared/errors/AppError';

import ShowProductService from '@modules/products/services/ShowProductService';
import FakeProductsRepository from '@modules/products/infra/typeorm/repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let showProduct: ShowProductService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    showProduct = new ShowProductService(fakeProductsRepository);
  });

  it('should be able show the profile', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Box blindado',
      description: 'Box blindado com espessura 300mm',
      quantity: 6,
      imageUrl:
        'http://windowsbulletin.com/wp-content/uploads/2020/07/How-to-Get-the-Size-of-an-Amazon-S3-Bucket.png',
    });

    const productSearched = await showProduct.execute(product.id);

    expect(productSearched.name).toBe('Box blindado');
    expect(productSearched.description).toBe(
      'Box blindado com espessura 300mm'
    );
  });

  it('should not be able show the product from non-existing product', async () => {
    await expect(
      showProduct.execute('non-existing-user-id')
    ).rejects.toBeInstanceOf(AppError);
  });
});
