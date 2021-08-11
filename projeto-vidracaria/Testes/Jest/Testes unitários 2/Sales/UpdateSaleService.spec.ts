import AppError from '@shared/errors/AppError';

import UpdateSaleService from '@modules/sales/services/UpdateSaleService';
import FakeSalesRepository from '@modules/sales/infra/typeorm/repositories/fakes/FakeSalesRepository';

let fakeSalesRepository: FakeSalesRepository;
let updateSale: UpdateSaleService;

describe('Sale :: UpdateSaleService', () => {
    beforeEach(() => {
        fakeSalesRepository = new FakeSalesRepository();

        updateSale = new UpdateSaleService(fakeSalesRepository);
    });

    it('should be able update the product', async () => {
        const sale = await fakeSalesRepository.create({
            customer_id: 'customer_id',
            itens: 'Prego, Parafuso',
            paid: 1,
            payment_type: 0,
            value: 50.25
        });

        const updatedSale = await updateSale.execute({
            itens: 'Prego, Parafuso, Porca',
            value: 3,
            customer_id: 'customer_id',
            id: sale.id,
            paid: 1,
            payment_type: 0
        });

        expect(updatedSale.value).toBe(3);
        expect(updatedSale.itens).toBe('Prego, Parafuso, Porca');
    });

    it('should not be able update the product from non-existing product', async () => {
        expect(
            updateSale.execute({
                id: 'non-existing-product-id',
                itens: 'Prego, Parafuso, Porca',
                value: 3,
                customer_id: 'customer_id',
                paid: 1,
                payment_type: 0
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
