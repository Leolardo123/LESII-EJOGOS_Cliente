import {MigrationInterface, QueryRunner} from "typeorm";

export class fixPurchase1665599226165 implements MigrationInterface {
    name = 'fixPurchase1665599226165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards" DROP CONSTRAINT "FK_2c4e290cf3df18ebe8d736d1b9c"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards" ADD CONSTRAINT "FK_2c4e290cf3df18ebe8d736d1b9c" FOREIGN KEY ("tbPurchasesId") REFERENCES "tb_purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards" DROP CONSTRAINT "FK_2c4e290cf3df18ebe8d736d1b9c"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards" ADD CONSTRAINT "FK_2c4e290cf3df18ebe8d736d1b9c" FOREIGN KEY ("tbPurchasesId") REFERENCES "tb_purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
