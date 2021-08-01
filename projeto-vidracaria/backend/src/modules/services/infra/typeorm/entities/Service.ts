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

@Entity('servicos') // referencia da tabela no banco de dados
class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    customer_id: string;

    @OneToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @Column()
    date: Date;

    @Column()
    place: string;

    @Column()
    type: number;

    @Column()
    value: number;

    @Column()
    status: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

export default Service;
