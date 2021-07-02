import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios') // referencia da tabela no banco de dados
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('type') => quando vazio o tipo padrão é string (varchar)
  // CTRL + SPACE mostra os tipos disponiveis.
  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  endereco: string;

  @Column()
  celular: string;

  @Column()
  email: string;

  @Column()
  usuario: string;

  @Column()
  senha: string;

  @Column()
  perfil: number;

  @Column('boolean')
  pagamento_cartao: boolean;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;
}

export default User;
