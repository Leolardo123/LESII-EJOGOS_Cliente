import {MigrationInterface, QueryRunner} from "typeorm";

export class addCreatedAt1665323935776 implements MigrationInterface {
    name = 'addCreatedAt1665323935776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" DROP CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses_types" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_places_types" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_brands" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_genders" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "coupom" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" ADD CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d" FOREIGN KEY ("tbAddressesId") REFERENCES "tb_addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" DROP CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d"`);
        await queryRunner.query(`ALTER TABLE "coupom" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_genders" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_brands" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_products" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_places_types" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses_types" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" ADD CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d" FOREIGN KEY ("tbAddressesId") REFERENCES "tb_addresses"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
