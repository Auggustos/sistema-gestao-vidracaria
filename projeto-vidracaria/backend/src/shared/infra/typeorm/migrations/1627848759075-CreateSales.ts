import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSales1627848759075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vendas',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'customer_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'value',
                        type: 'float',
                    },
                    {
                        name: 'date',
                        type: 'timestamp'
                    },
                    {
                        name: 'itens',
                        type: 'varchar',
                    },
                    {
                        name: 'payment_type',
                        type: 'integer',
                    },
                    {
                        name: 'paid',
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
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'vendas',
            new TableForeignKey({
                name: 'SaleCustomer',
                columnNames: ['customer_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'clientes',
                onDelete: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('vendas', 'SaleCustomer');

        await queryRunner.dropTable('vendas');
    }

}
