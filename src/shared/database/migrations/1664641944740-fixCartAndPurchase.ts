import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCartAndPurchase1664641944740 implements MigrationInterface {
    name = 'fixCartAndPurchase1664641944740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_7d165883b8356c6ae404820de7e"`);
        await queryRunner.query(`CREATE TABLE "tb_purchases_cards_tb_cards" ("tbPurchasesId" integer NOT NULL, "tbCardsId" integer NOT NULL, CONSTRAINT "PK_7c10fd75cb4a2a131fb28b5a4a6" PRIMARY KEY ("tbPurchasesId", "tbCardsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a6dd27568a2307c00f179eacea" ON "tb_purchases_cards_tb_cards" ("tbPurchasesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8e49474406560e79ad7f70ac9" ON "tb_purchases_cards_tb_cards" ("tbCardsId") `);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "payment_method"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP COLUMN "payment_address_id"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP COLUMN "delivery_address_id"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "payment_address_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "delivery_address_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_7d165883b8356c6ae404820de7e" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards_tb_cards" ADD CONSTRAINT "FK_a6dd27568a2307c00f179eaceaf" FOREIGN KEY ("tbPurchasesId") REFERENCES "tb_purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards_tb_cards" ADD CONSTRAINT "FK_e8e49474406560e79ad7f70ac97" FOREIGN KEY ("tbCardsId") REFERENCES "tb_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards_tb_cards" DROP CONSTRAINT "FK_e8e49474406560e79ad7f70ac97"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_cards_tb_cards" DROP CONSTRAINT "FK_a6dd27568a2307c00f179eaceaf"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_7d165883b8356c6ae404820de7e"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "delivery_address_id"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "payment_address_id"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD "delivery_address_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD "payment_address_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "person_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "payment_method" character varying NOT NULL DEFAULT 'credit_card'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8e49474406560e79ad7f70ac9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6dd27568a2307c00f179eacea"`);
        await queryRunner.query(`DROP TABLE "tb_purchases_cards_tb_cards"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_7d165883b8356c6ae404820de7e" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
