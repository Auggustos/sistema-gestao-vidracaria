import ShowCustomerService from '@modules/customers/services/ShowCostumerService';
import FakeCustomersRepository from '@modules/customers/infra/typeorm/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomer: ShowCustomerService;
describe('Customer :: ShowCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    showCustomer = new ShowCustomerService(fakeCustomersRepository);
  });

  it('should be able show the customer infos', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Zé da Fruta',
      phone: '(35) 99917-4225',
      address: 'Rua dos Jacarés',
      type: 0,
    });

    const customerSearched = await showCustomer.execute(customer.id);

    expect(customerSearched.name).toBe('Zé da Fruta');
    expect(customerSearched.phone).toBe('(35) 99917-4225');
  });

  it('should not be able show infos of the customer from non-existing customer', async () => {
    await expect(
      showCustomer.execute('non-existing-user-id')
    ).rejects.toBeInstanceOf(AppError);
  });
});
