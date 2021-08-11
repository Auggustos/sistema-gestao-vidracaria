import FakeServicesRepository from '../infra/typeorm/repositories/fakes/FakeServicesRepository';
import ListServicesService from './ListServicesService';

let fakeServicesRepository: FakeServicesRepository;
let listServices: ListServicesService;
describe('Service :: ListServicesService', () => {
    beforeEach(() => {
        fakeServicesRepository = new FakeServicesRepository();
        listServices = new ListServicesService(fakeServicesRepository);
    });

    it('should be able to list the sales', async () => {
        const service1 = await fakeServicesRepository.create({
            customer_id: 'customer_id',
            date: new Date('2021-09-02'),
            place: 'UNIFEI',
            type: 0,
            value: 5,
            status: 0
        });

        const service2 = await fakeServicesRepository.create({
            customer_id: 'customer_id',
            date: new Date('2021-09-02'),
            place: 'UNIFEI',
            type: 0,
            value: 5,
            status: 0
        });

        const services = await listServices.execute();



        expect(services).toEqual([service1, service2]);
    });

});
