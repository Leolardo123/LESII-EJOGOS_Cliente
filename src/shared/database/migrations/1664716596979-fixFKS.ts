import {MigrationInterface, QueryRunner} from "typeorm";

export class fixFKS1664716596979 implements MigrationInterface {
    name = 'fixFKS1664716596979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP CONSTRAINT "FK_6198283317c14c90c8ff69fd2f6"`);
        await queryRunner.query(`ALTER TABLE "coupom" RENAME COLUMN "type_id" TO "type"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "status_id"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "status" character varying NOT NULL DEFAULT 'EM ANÁLISE'`);
        await queryRunner.query(`ALTER TABLE "tb_users" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD "addressesId" integer`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD "personId" integer`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_7d165883b8356c6ae404820de7e"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ALTER COLUMN "cart_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD CONSTRAINT "FK_6198283317c14c90c8ff69fd2f6" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_7d165883b8356c6ae404820de7e" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_13acda6eaf7d7251be19f1457a5" FOREIGN KEY ("payment_address_id") REFERENCES "tb_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_7bfdee96048bb75e597e76ddf26" FOREIGN KEY ("delivery_address_id") REFERENCES "tb_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_edbdfccce20ca8e849a762a8b62" FOREIGN KEY ("addressesId") REFERENCES "tb_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_6f2d935981867c7e1b6a4dbab6a" FOREIGN KEY ("personId") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_6f2d935981867c7e1b6a4dbab6a"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_edbdfccce20ca8e849a762a8b62"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_7bfdee96048bb75e597e76ddf26"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_13acda6eaf7d7251be19f1457a5"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_7d165883b8356c6ae404820de7e"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP CONSTRAINT "FK_6198283317c14c90c8ff69fd2f6"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ALTER COLUMN "cart_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_7d165883b8356c6ae404820de7e" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP COLUMN "personId"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP COLUMN "addressesId"`);
        await queryRunner.query(`ALTER TABLE "tb_users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD "status_id" character varying NOT NULL DEFAULT 'EM ANÁLISE'`);
        await queryRunner.query(`ALTER TABLE "coupom" RENAME COLUMN "type" TO "type_id"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD CONSTRAINT "FK_6198283317c14c90c8ff69fd2f6" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
