import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateServices1627855257949 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'servicos',
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
                        name: 'date',
                        type: 'timestamp',
                    },
                    {
                        name: 'place',
                        type: 'varchar'
                    },
                    {
                        name: 'type',
                        type: 'integer',
                    },
                    {
                        name: 'value',
                        type: 'float',
                    },
                    {
                        name: 'status',
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
            'servicos',
            new TableForeignKey({
                name: 'ServiceCustomer',
                columnNames: ['customer_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'clientes',
                onDelete: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('servicos', 'ServiceCustomer');

        await queryRunner.dropTable('servicos');
    }

}
