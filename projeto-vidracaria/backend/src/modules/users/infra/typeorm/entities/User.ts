import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  
  @Entity('usuarios') // referencia da tabela no banco de dados
  class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    // @Column('type') => quando vazio o tipo padrão é string (varchar)
    // CTRL + SPACE mostra os tipos disponiveis.

    @Column()
    name: string;
    
    @Column()
    email: string;
  
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
  }
  
  export default User;
  