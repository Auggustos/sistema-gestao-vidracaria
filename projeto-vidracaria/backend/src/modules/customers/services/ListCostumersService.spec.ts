import ListCostumersService from '@modules/customers/services/ListCostumersService';
import FakeCustomersRepository from '@modules/customers/infra/typeorm/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomers: ListCostumersService;
describe('Customer :: ListCustomersService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listCustomers = new ListCostumersService(fakeCustomersRepository);
  });

  it('should be able to list all products registred', async () => {
    const customer1 = await fakeCustomersRepository.create({
      name: 'Zé da Fruta',
      phone: '(35) 99917-4225',
      address: 'Rua dos Jacarés',
      type: 0,
    });

    const customer2 = await fakeCustomersRepository.create({
      name: 'Zé do Arroz',
      phone: '(35) 99927-2235',
      address: 'Rua dos Jacarés',
      type: 0,
    });

    const customers = await listCustomers.execute();

    expect(customers).toEqual([customer1, customer2]);
  });
});
