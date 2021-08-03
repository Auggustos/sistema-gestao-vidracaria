import AppError from '@shared/errors/AppError';
import FakeServicesRepository from '../infra/typeorm/repositories/fakes/FakeServicesRepository';
import CreateServiceService from './CreateServiceService';

let fakeServicesRepository: FakeServicesRepository;
let createService: CreateServiceService;
describe('Service :: CreateServiceService', () => {
    beforeEach(() => {
        fakeServicesRepository = new FakeServicesRepository();
        createService = new CreateServiceService(fakeServicesRepository);
    });

    it('should be able to create', async () => {

        const result = await createService.execute({
            customer_id: 'customer_id',
            date: new Date('2021-09-02'),
            place: 'UNIFEI',
            type: 0,
            value: 5,
            status: 0

        });

        expect(result).toHaveProperty('date');
        expect(result).toHaveProperty('place');
        expect(result).toHaveProperty('type');
        expect(result).toHaveProperty('value');
        expect(result).toHaveProperty('status');
    });
    it('should not be able to create service with negative value', async () => {
        await expect(
            createService.execute({
                customer_id: 'customer_id',
                date: new Date(),
                place: 'UNIFEI',
                type: 0,
                value: -5,
                status: 0
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});
