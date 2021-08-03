import AppError from '@shared/errors/AppError';
import FakeServicesRepository from '../infra/typeorm/repositories/fakes/FakeServicesRepository';
import ShowServiceService from './ShowServiceService';

let fakeServicesRepository: FakeServicesRepository;
let showService: ShowServiceService;
describe('Service :: ShowServiceService', () => {
    beforeEach(() => {
        fakeServicesRepository = new FakeServicesRepository();
        showService = new ShowServiceService(fakeServicesRepository);
    });


    it('should be able show the service', async () => {
        const service = await fakeServicesRepository.create({
            customer_id: 'customer_id',
            date: new Date('2021-09-02'),
            place: 'UNIFEI',
            type: 0,
            value: 5,
            status: 0
        });

        const serviceSearched = await showService.execute(service.id);

        expect(serviceSearched.place).toBe('UNIFEI');
        expect(serviceSearched.value).toBe(5);
    });

    it('should not be able show the product from non-existing service', async () => {
        await expect(
            showService.execute('non-existing-service-id')
        ).rejects.toBeInstanceOf(AppError);
    });
});
