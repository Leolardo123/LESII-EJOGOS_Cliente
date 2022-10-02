import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAddressPerson1664720033786 implements MigrationInterface {
    name = 'fixAddressPerson1664720033786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_edbdfccce20ca8e849a762a8b62"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_6f2d935981867c7e1b6a4dbab6a"`);
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" DROP CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP COLUMN "addressesId"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP COLUMN "personId"`);
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" ADD CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d" FOREIGN KEY ("tbAddressesId") REFERENCES "tb_addresses"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" DROP CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD "personId" integer`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD "addressesId" integer`);
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" ADD CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d" FOREIGN KEY ("tbAddressesId") REFERENCES "tb_addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_6f2d935981867c7e1b6a4dbab6a" FOREIGN KEY ("personId") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_edbdfccce20ca8e849a762a8b62" FOREIGN KEY ("addressesId") REFERENCES "tb_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
