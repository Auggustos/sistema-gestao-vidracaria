import AppError from '@shared/errors/AppError';
import FakeServicesRepository from '../infra/typeorm/repositories/fakes/FakeServicesRepository';
import UpdateServiceService from './UpdateServiceService';

let fakeServicesRepository: FakeServicesRepository;
let updateService: UpdateServiceService;
describe('Service :: ShowServiceService', () => {
    beforeEach(() => {
        fakeServicesRepository = new FakeServicesRepository();
        updateService = new UpdateServiceService(fakeServicesRepository);
    });



    it('should be able update the service', async () => {
        const service = await fakeServicesRepository.create({
            customer_id: 'customer_id',
            date: new Date('2021-09-02'),
            place: 'UNIFEI',
            type: 0,
            value: 5,
            status: 0
        });

        const updatedService = await updateService.execute({
            id: service.id,
            customer_id: 'customer_id',
            date: new Date('2021-09-02'),
            place: 'FEPI',
            type: 0,
            value: 5,
            status: 0
        });

        expect(updatedService.place).toBe('Prego, Parafuso, Porca');
    });

    it('should not be able update the product from non-existing product', async () => {
        expect(
            updateService.execute({
                id: 'non-existing-service-id',
                customer_id: 'customer_id',
                date: new Date('2021-09-02'),
                place: 'FEPI',
                type: 0,
                value: 5,
                status: 0
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
