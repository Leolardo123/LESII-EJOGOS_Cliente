import {MigrationInterface, QueryRunner} from "typeorm";

export class fixPayments1668540641363 implements MigrationInterface {
    name = 'fixPayments1668540641363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchase_payments" ADD "purchase_id" integer`);
        await queryRunner.query(`ALTER TABLE "tb_purchase_payments" ADD CONSTRAINT "FK_be380fe31794f1f85103f04ecf5" FOREIGN KEY ("purchase_id") REFERENCES "tb_purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchase_payments" DROP CONSTRAINT "FK_be380fe31794f1f85103f04ecf5"`);
        await queryRunner.query(`ALTER TABLE "tb_purchase_payments" DROP COLUMN "purchase_id"`);
    }

}
