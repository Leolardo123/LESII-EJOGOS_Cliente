import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCards1665586895205 implements MigrationInterface {
    name = 'fixCards1665586895205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_purchases_cards" ("tbPurchasesId" integer NOT NULL, "tbCardsId" integer NOT NULL, CONSTRAINT "PK_f933a7c82d0fb674afb7c2a1771" PRIMARY KEY ("tbPurchasesId", "tbCardsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c4e290cf3df18ebe8d736d1b9" ON "tb_purchases_cards" ("tbPurchasesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1d13dec0a9e6fbb105570b3942" ON "tb_purchases_cards" ("tbCardsId") `);
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards" ADD CONSTRAINT "FK_2c4e290cf3df18ebe8d736d1b9c" FOREIGN KEY ("tbPurchasesId") REFERENCES "tb_purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards" ADD CONSTRAINT "FK_1d13dec0a9e6fbb105570b3942b" FOREIGN KEY ("tbCardsId") REFERENCES "tb_cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards" DROP CONSTRAINT "FK_1d13dec0a9e6fbb105570b3942b"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards" DROP CONSTRAINT "FK_2c4e290cf3df18ebe8d736d1b9c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1d13dec0a9e6fbb105570b3942"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c4e290cf3df18ebe8d736d1b9"`);
        await queryRunner.query(`DROP TABLE "tb_purchases_cards"`);
    }

}
