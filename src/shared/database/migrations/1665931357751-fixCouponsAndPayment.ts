import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCouponsAndPayment1665931357751 implements MigrationInterface {
    name = 'fixCouponsAndPayment1665931357751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_5d1025fe268486807befd88d297"`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f"`);
        await queryRunner.query(`ALTER TABLE "coupom" ALTER COLUMN "person_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_5d1025fe268486807befd88d297" FOREIGN KEY ("couponsId") REFERENCES "coupom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_5d1025fe268486807befd88d297"`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f"`);
        await queryRunner.query(`ALTER TABLE "coupom" ALTER COLUMN "person_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_5d1025fe268486807befd88d297" FOREIGN KEY ("couponsId") REFERENCES "coupom"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
