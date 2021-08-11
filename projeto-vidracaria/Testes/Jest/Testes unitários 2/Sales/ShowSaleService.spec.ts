import AppError from '@shared/errors/AppError';

import ShowProductService from '@modules/products/services/ShowProductService';
import FakeSalesRepository from '@modules/sales/infra/typeorm/repositories/fakes/FakeSalesRepository';
import ShowSaleService from './ShowSaleService';

let fakeSalesRepository: FakeSalesRepository;
let showSale: ShowSaleService;

describe('Sale :: ShowSaleService', () => {
    beforeEach(() => {
        fakeSalesRepository = new FakeSalesRepository();
        showSale = new ShowSaleService(fakeSalesRepository);
    });

    it('should be able show the profile', async () => {
        const sale = await await fakeSalesRepository.create({
            customer_id: 'customer_id',
            itens: 'Prego, Parafuso',
            paid: 1,
            payment_type: 0,
            value: 50.25
        });


        const saleSearched = await showSale.execute(sale.id);

        expect(saleSearched.itens).toBe('Prego, Parafuso');
        expect(saleSearched.paid).toBe(1);
    });

    it('should not be able show the product from non-existing product', async () => {
        await expect(
            showSale.execute('non-existing-customer-id')
        ).rejects.toBeInstanceOf(AppError);
    });
});
