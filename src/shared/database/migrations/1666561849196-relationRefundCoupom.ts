import {MigrationInterface, QueryRunner} from "typeorm";

export class relationRefundCoupom1666561849196 implements MigrationInterface {
    name = 'relationRefundCoupom1666561849196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_refunds" ADD "coupom_id" integer`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" ADD CONSTRAINT "UQ_9bb250d6dd918f641d448378a96" UNIQUE ("coupom_id")`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" ADD CONSTRAINT "FK_9bb250d6dd918f641d448378a96" FOREIGN KEY ("coupom_id") REFERENCES "coupom"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_refunds" DROP CONSTRAINT "FK_9bb250d6dd918f641d448378a96"`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" DROP CONSTRAINT "UQ_9bb250d6dd918f641d448378a96"`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" DROP COLUMN "coupom_id"`);
    }

}
