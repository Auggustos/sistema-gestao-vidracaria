import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';

@Entity('vendas') // referencia da tabela no banco de dados
class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customer_id: string;

    @OneToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @Column()
    value: number;


    @Column()
    itens: string;

    @Column()
    payment_type: number;

    @Column()
    paid: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

export default Sale;
