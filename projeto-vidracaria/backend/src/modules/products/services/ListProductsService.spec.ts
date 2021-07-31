import ListProductsService from '@modules/products/services/ListProductsService';
import FakeProductsRepository from '@modules/products/infra/typeorm/repositories/fakes/FakeProductsRepository';

let fakeProductsRepository: FakeProductsRepository;
let listProduct: ListProductsService;

describe('ListProductsService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProduct = new ListProductsService(fakeProductsRepository);
  });

  it('should be able to list all products registred', async () => {
    const appointment1 = await fakeProductsRepository.create({
      name: 'Box blindado',
      description: 'Box blindado com espessura 300mm',
      quantity: 61,
      imageFileName:
        'http://windowsbulletin.com/wp-content/uploads/2020/07/How-to-Get-the-Size-of-an-Amazon-S3-Bucket.png',
    });

    const appointment2 = await fakeProductsRepository.create({
      name: 'Box blindado',
      description: 'Box blindado com espessura 300mm',
      quantity: 615,
      imageFileName:
        'http://windowsbulletin.com/wp-content/uploads/2020/07/How-to-Get-the-Size-of-an-Amazon-S3-Bucket.png',
    });

    const appointments = await listProduct.execute();

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
