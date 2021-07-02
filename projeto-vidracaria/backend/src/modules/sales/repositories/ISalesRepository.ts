import ICreateSaleDTO from '../dtos/ICreateSaleDTO';
import Sale from '../infra/typeorm/entities/Sale';
// - findByUser
// - createAndSave
export default interface ISalesRepository {
  findAll(): Promise<Sale[]>;
  findById(id: string): Promise<Sale | undefined>;
  create(data: ICreateSaleDTO): Promise<Sale>;
  save(sale: Sale): Promise<Sale>;
  delete(sale: Sale): Promise<Sale>;
}
