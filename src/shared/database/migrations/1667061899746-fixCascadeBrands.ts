import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCascadeBrands1667061899746 implements MigrationInterface {
    name = 'fixCascadeBrands1667061899746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ALTER COLUMN "brand_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039" FOREIGN KEY ("brand_id") REFERENCES "tb_brands"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ALTER COLUMN "brand_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039" FOREIGN KEY ("brand_id") REFERENCES "tb_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

}
