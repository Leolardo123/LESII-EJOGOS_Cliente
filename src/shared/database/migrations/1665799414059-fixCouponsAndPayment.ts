import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCouponsAndPayment1665799414059 implements MigrationInterface {
    name = 'fixCouponsAndPayment1665799414059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039"`);
        await queryRunner.query(`CREATE TABLE "tb_purchase_payments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "card_id" integer, CONSTRAINT "PK_0a9b5f8229c4f27c654f3824fef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD "is_used" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD "purchase_id" integer`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD "person_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "couponsId" integer`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD "code" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "coupom" ALTER COLUMN "type" SET DEFAULT 'TROCA'`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD CONSTRAINT "FK_2e8cfa1e4f5291190d8b4287a5d" FOREIGN KEY ("purchase_id") REFERENCES "tb_purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_5d1025fe268486807befd88d297" FOREIGN KEY ("couponsId") REFERENCES "coupom"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_purchase_payments" ADD CONSTRAINT "FK_cdac673b79b64eadac7f379c8cd" FOREIGN KEY ("card_id") REFERENCES "tb_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039" FOREIGN KEY ("brand_id") REFERENCES "tb_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039"`);
        await queryRunner.query(`ALTER TABLE "tb_purchase_payments" DROP CONSTRAINT "FK_cdac673b79b64eadac7f379c8cd"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_5d1025fe268486807befd88d297"`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f"`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP CONSTRAINT "FK_2e8cfa1e4f5291190d8b4287a5d"`);
        await queryRunner.query(`ALTER TABLE "coupom" ALTER COLUMN "type" SET DEFAULT 'return_product'`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "couponsId"`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP COLUMN "purchase_id"`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP COLUMN "is_used"`);
        await queryRunner.query(`DROP TABLE "tb_purchase_payments"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039" FOREIGN KEY ("brand_id") REFERENCES "tb_brands"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
