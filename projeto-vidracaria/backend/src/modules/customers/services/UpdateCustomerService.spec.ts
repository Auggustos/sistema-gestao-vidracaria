import UpdateCostumerService from '@modules/customers/services/UpdateCustomerService';
import FakeCustomersRepository from '@modules/customers/infra/typeorm/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomer: UpdateCostumerService;
describe('Customer :: UpdateCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    updateCustomer = new UpdateCostumerService(fakeCustomersRepository);
  });

  it('should be able update the product', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Zé da Fruta',
      phone: '(35) 99917-4225',
      address: 'Rua dos Jacarés',
      type: 0,
    });

    const updatedCustomer = await updateCustomer.execute({
      id: customer.id,
      name: 'Zé da Frutona',
      phone: '(35) 99917-4225',
      type: 1,
    });

    expect(updatedCustomer.name).toBe('Zé da Frutona');
    expect(updatedCustomer.phone).toBe('(35) 99917-4225');
    expect(updatedCustomer.type).toBe(1);
  });

  it('should not be able update the product from non-existing product', async () => {
    expect(
      updateCustomer.execute({
        id: 'non-existing-product-id',
        name: 'Zé da Frutona',
        phone: '(35) 99917-4225',
        type: 1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
