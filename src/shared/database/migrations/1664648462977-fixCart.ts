import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCart1664648462977 implements MigrationInterface {
    name = 'fixCart1664648462977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677" FOREIGN KEY ("product_id") REFERENCES "tb_products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677" FOREIGN KEY ("product_id") REFERENCES "tb_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
