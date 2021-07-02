import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { Table } from 'typeorm/schema-builder/table/Table';

export default class CreateSale1624999377809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vendas',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'costumer_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'double',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'itens',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'paid_at',
            type: 'timestamp',
          },
          {
            name: 'paid_with',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'vendas',
      new TableForeignKey({
        name: 'SaleCostumer',
        columnNames: ['costumer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vendas', 'SaleCostumer');
    await queryRunner.dropTable('vendas');
  }
}
