import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('clientes') // referencia da tabela no banco de dados
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('type') => quando vazio o tipo padrão é string (varchar)
  // CTRL + SPACE mostra os tipos disponiveis.
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  type: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Customer;
