import {MigrationInterface, QueryRunner} from "typeorm";

export class fixRefunds1666539989302 implements MigrationInterface {
    name = 'fixRefunds1666539989302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupom" DROP CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_5d1025fe268486807befd88d297"`);
        await queryRunner.query(`CREATE TABLE "tb_refunds" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "reason" text NOT NULL, "restock" boolean NOT NULL DEFAULT true, "status" character varying NOT NULL DEFAULT 'EM ANÁLISE', "item_id" integer, CONSTRAINT "REL_8d7cedffb0f582a440667dd955" UNIQUE ("item_id"), CONSTRAINT "PK_f1ece5f1da93413f63c0af77429" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "couponsId"`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" ADD CONSTRAINT "FK_8d7cedffb0f582a440667dd9553" FOREIGN KEY ("item_id") REFERENCES "tb_carts_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupom" DROP CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f"`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" DROP CONSTRAINT "FK_8d7cedffb0f582a440667dd9553"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "couponsId" integer`);
        await queryRunner.query(`DROP TABLE "tb_refunds"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_5d1025fe268486807befd88d297" FOREIGN KEY ("couponsId") REFERENCES "coupom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD CONSTRAINT "FK_607888b94c56d9dbb2eae450e1f" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
