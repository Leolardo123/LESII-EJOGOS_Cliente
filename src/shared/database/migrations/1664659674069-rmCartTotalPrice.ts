import {MigrationInterface, QueryRunner} from "typeorm";

export class rmCartTotalPrice1664659674069 implements MigrationInterface {
    name = 'rmCartTotalPrice1664659674069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP COLUMN "total_price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD "total_price" integer NOT NULL`);
    }

}
