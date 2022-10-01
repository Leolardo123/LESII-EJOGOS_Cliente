import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCart1664646168452 implements MigrationInterface {
    name = 'fixCart1664646168452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD "isOpen" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP COLUMN "isOpen"`);
    }

}
