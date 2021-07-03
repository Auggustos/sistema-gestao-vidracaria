import AppError from '@shared/errors/AppError';

import UpdateProductService from '@modules/products/services/UpdateProductService';
import FakeProductsRepository from '@modules/products/infra/typeorm/repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let updateProduct: UpdateProductService;

describe('Product :: UpdateProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    updateProduct = new UpdateProductService(fakeProductsRepository);
  });

  it('should be able update the product', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Box blindado',
      description: 'Box blindado com espessura 300mm',
      quantity: 6,
      imageUrl:
        'http://windowsbulletin.com/wp-content/uploads/2020/07/How-to-Get-the-Size-of-an-Amazon-S3-Bucket.png',
    });

    const updatedProduct = await updateProduct.execute({
      id: product.id,
      description: 'Muito forte',
      name: 'Box blindado com espessura 500mm pra aguentar bala',
      quantity: 50,
    });

    expect(updatedProduct.name).toBe(
      'Box blindado com espessura 500mm pra aguentar bala'
    );
    expect(updatedProduct.description).toBe('Muito forte');
    expect(updatedProduct.quantity).toBe(50);
  });

  it('should not be able update the product from non-existing product', async () => {
    expect(
      updateProduct.execute({
        id: 'non-existing-product-id',
        description: 'Muito forte',
        name: 'Box blindado com espessura 500mm pra aguentar bala',
        quantity: 50,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
