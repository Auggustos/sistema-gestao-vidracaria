import CreateCostumerService from '@modules/customers/services/CreateCostumerService';
import FakeCustomersRepository from '@modules/customers/infra/typeorm/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCostumerService;
describe('Customer :: CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCostumerService(fakeCustomersRepository);
  });

  it('should be able to create', async () => {
    const result = await createCustomer.execute({
      name: 'Zé da Fruta',
      phone: '(35) 99937-4435',
      address: 'Rua dos Jacarés',
      type: 0,
    });

    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('phone');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('type');
  });
});
