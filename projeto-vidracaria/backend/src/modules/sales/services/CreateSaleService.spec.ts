import AppError from '@shared/errors/AppError';
import FakeSalesRepository from '../infra/typeorm/repositories/fakes/FakeSalesRepository';
import CreateSaleService from './CreateSaleService';

let fakeSalesRepository: FakeSalesRepository;
let createSale: CreateSaleService;
describe('Sale :: CreateSaleService', () => {
    beforeEach(() => {
        fakeSalesRepository = new FakeSalesRepository();
        createSale = new CreateSaleService(fakeSalesRepository);
    });

    it('should be able to create', async () => {

        const result = await createSale.execute({
            customer_id: 'customer_id',
            itens: 'Prego, Parafuso',
            paid: 1,
            payment_type: 0,
            value: 50.25
        });

        expect(result).toHaveProperty('customer_id');
        expect(result).toHaveProperty('itens');
        expect(result).toHaveProperty('paid');
        expect(result).toHaveProperty('payment_type');
        expect(result).toHaveProperty('value');
    });
    it('should not be able to create sale with negative value', async () => {
        await expect(
            createSale.execute({
                customer_id: 'customer_id',
                itens: 'Prego, Parafuso',
                paid: 1,
                payment_type: 0,
                value: -5
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});
