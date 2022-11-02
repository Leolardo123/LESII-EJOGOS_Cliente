import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCoupons1667421058228 implements MigrationInterface {
    name = 'fixCoupons1667421058228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_refunds" DROP CONSTRAINT "FK_9bb250d6dd918f641d448378a96"`);
        await queryRunner.query(`CREATE TABLE "tb_coupons" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "code" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL DEFAULT '0', "type" character varying NOT NULL DEFAULT 'TROCA', "is_used" boolean NOT NULL DEFAULT false, "purchase_id" integer, "person_id" integer, CONSTRAINT "PK_2003becb6ec4ce556473f9b93c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" ALTER COLUMN "restock" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tb_coupons" ADD CONSTRAINT "FK_7a9b438c4aa45c0d10f0c812dfe" FOREIGN KEY ("purchase_id") REFERENCES "tb_purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_coupons" ADD CONSTRAINT "FK_77c67dfcf81415b43c3040f7c3c" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" ADD CONSTRAINT "FK_9bb250d6dd918f641d448378a96" FOREIGN KEY ("coupom_id") REFERENCES "tb_coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_refunds" DROP CONSTRAINT "FK_9bb250d6dd918f641d448378a96"`);
        await queryRunner.query(`ALTER TABLE "tb_coupons" DROP CONSTRAINT "FK_77c67dfcf81415b43c3040f7c3c"`);
        await queryRunner.query(`ALTER TABLE "tb_coupons" DROP CONSTRAINT "FK_7a9b438c4aa45c0d10f0c812dfe"`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" ALTER COLUMN "restock" SET DEFAULT true`);
        await queryRunner.query(`DROP TABLE "tb_coupons"`);
        await queryRunner.query(`ALTER TABLE "tb_refunds" ADD CONSTRAINT "FK_9bb250d6dd918f641d448378a96" FOREIGN KEY ("coupom_id") REFERENCES "coupom"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
