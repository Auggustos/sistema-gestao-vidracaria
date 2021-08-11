import FakeSalesRepository from '../infra/typeorm/repositories/fakes/FakeSalesRepository';
import ListSalesService from './ListSalesService';

let fakeSalesRepository: FakeSalesRepository;
let listSales: ListSalesService;
describe('Sale :: ListSalesService', () => {
    beforeEach(() => {
        fakeSalesRepository = new FakeSalesRepository();
        listSales = new ListSalesService(fakeSalesRepository);
    });

    it('should be able to list the sales', async () => {
        const sale1 = await fakeSalesRepository.create({
            customer_id: 'customer_id',
            itens: 'Prego, Parafuso',
            paid: 1,
            payment_type: 0,
            value: 50.25
        });

        const sale2 = await fakeSalesRepository.create({
            customer_id: 'customer_id',
            itens: 'Prego, Parafuso',
            paid: 1,
            payment_type: 0,
            value: 50.25
        });

        const sales = await listSales.execute();



        expect(sales).toEqual([sale1, sale2]);
    });

});
