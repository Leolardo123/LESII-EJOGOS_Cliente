import {MigrationInterface, QueryRunner} from "typeorm";

export class fixProducts1667421785031 implements MigrationInterface {
    name = 'fixProducts1667421785031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_product_history" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "action" character varying NOT NULL, "reason" character varying NOT NULL DEFAULT 'FORA DE MERCADO', "product_id" integer NOT NULL, CONSTRAINT "PK_1a5ca9e86ce2a051c5597986db0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_product_history" ADD CONSTRAINT "FK_bedbd503d91ab2ee86bdf8ceafd" FOREIGN KEY ("product_id") REFERENCES "tb_products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_product_history" DROP CONSTRAINT "FK_bedbd503d91ab2ee86bdf8ceafd"`);
        await queryRunner.query(`DROP TABLE "tb_product_history"`);
    }

}
