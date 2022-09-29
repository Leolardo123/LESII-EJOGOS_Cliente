import {MigrationInterface, QueryRunner} from "typeorm";

export class createDatabase1664494631545 implements MigrationInterface {
    name = 'createDatabase1664494631545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_addresses_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_aae6705201c6fc0f9e792bd101b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_places_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_c53e8458e5e67a3ea19fb918119" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_brands" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_e96f07b75c390335257b00496ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_cards" ("id" SERIAL NOT NULL, "owner_name" character varying NOT NULL, "number" character varying NOT NULL, "brand_id" integer NOT NULL, "person_id" integer NOT NULL, "security_code" character varying NOT NULL, CONSTRAINT "PK_6dea528d0de1b4ea34bcff34200" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_products" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "stock" integer NOT NULL, "requirements" character varying NOT NULL, "publisher" character varying NOT NULL, "developer" character varying NOT NULL, "language" character varying NOT NULL, "subtitle" character varying NOT NULL, "release_date" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_26292104cb895b49349b5353003" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_carts_items" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "cart_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "UQ_c1d9b1541a4feb420184fe38c35" UNIQUE ("cart_id", "product_id"), CONSTRAINT "PK_480709bba97ca7979bf298bca64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_purchases" ("id" SERIAL NOT NULL, "total_price" integer NOT NULL, "cart_id" integer NOT NULL, "payment_method" character varying NOT NULL DEFAULT 'credit_card', "person_id" character varying NOT NULL, "status_id" character varying NOT NULL DEFAULT 'EM ANÁLISE', CONSTRAINT "REL_7d165883b8356c6ae404820de7" UNIQUE ("cart_id"), CONSTRAINT "PK_7cad9595706b9a2dcf6ac28e1e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_item_carts" ("id" SERIAL NOT NULL, "total_price" integer NOT NULL, "person_id" integer NOT NULL, "payment_address_id" integer NOT NULL, "delivery_address_id" integer NOT NULL, CONSTRAINT "PK_f1effbae54a68fdaffee971b8d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_genders" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ad4433ee86ecc6885a91b560532" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_phones" ("id" SERIAL NOT NULL, "number" character varying NOT NULL, "ddd" integer NOT NULL, "person_id" integer NOT NULL, CONSTRAINT "REL_26973d11e13ec316b40eae12f6" UNIQUE ("person_id"), CONSTRAINT "PK_91419dd4de201e2b2eb80a9faf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'usuario', CONSTRAINT "UQ_142ce3112f446974f1c96a5d3ff" UNIQUE ("email"), CONSTRAINT "PK_a2c23e0679749c22ffa6c2be910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_persons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "gender_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_f0dc0d17f29a844a6089e0aef8" UNIQUE ("user_id"), CONSTRAINT "PK_2af079ba897e0e01ca2ae609e42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_addresses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "cep" character varying NOT NULL, "number" integer NOT NULL, "address_type_id" integer NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "complement" character varying, "neighborhood" character varying NOT NULL, "place" character varying NOT NULL, "place_type_id" integer NOT NULL, CONSTRAINT "PK_86c23d37552ae8e71ecbcfd46d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_purchases_coupons" ("id" SERIAL NOT NULL, "coupon_id" character varying NOT NULL, "purchase_id" character varying NOT NULL, "purchaseId" integer, CONSTRAINT "UQ_22ddfcbd6c920c56d23f4634c72" UNIQUE ("purchase_id", "coupon_id"), CONSTRAINT "PK_8ae2cc317cfc0ca750cce8723a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coupom" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "value" integer NOT NULL DEFAULT '0', "type_id" character varying NOT NULL DEFAULT 'return_product', CONSTRAINT "PK_dac9504d91710ffbdd15752cb7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_persons_addresses" ("tbPersonsId" integer NOT NULL, "tbAddressesId" integer NOT NULL, CONSTRAINT "PK_d5a3016e36dac1be1ee04174a6f" PRIMARY KEY ("tbPersonsId", "tbAddressesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7be5b8faadb863b9cb17435c61" ON "tb_persons_addresses" ("tbPersonsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a3dfceaedb2d5870b83356c5f5" ON "tb_persons_addresses" ("tbAddressesId") `);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039" FOREIGN KEY ("brand_id") REFERENCES "tb_brands"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_cards" ADD CONSTRAINT "FK_26d44dc906b92c061a6320cd850" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" ADD CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677" FOREIGN KEY ("product_id") REFERENCES "tb_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" ADD CONSTRAINT "FK_7d165883b8356c6ae404820de7e" FOREIGN KEY ("cart_id") REFERENCES "tb_item_carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" ADD CONSTRAINT "FK_6198283317c14c90c8ff69fd2f6" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_phones" ADD CONSTRAINT "FK_26973d11e13ec316b40eae12f6e" FOREIGN KEY ("person_id") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_16c3a260805188fc6bdb85d63df" FOREIGN KEY ("gender_id") REFERENCES "tb_genders"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_persons" ADD CONSTRAINT "FK_f0dc0d17f29a844a6089e0aef86" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_6dafc292779632e155ff084e5ad" FOREIGN KEY ("address_type_id") REFERENCES "tb_addresses_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" ADD CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3" FOREIGN KEY ("place_type_id") REFERENCES "tb_places_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_coupons" ADD CONSTRAINT "FK_87d36bdfd59dd6885cc01ebde7f" FOREIGN KEY ("purchaseId") REFERENCES "tb_purchases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" ADD CONSTRAINT "FK_7be5b8faadb863b9cb17435c61a" FOREIGN KEY ("tbPersonsId") REFERENCES "tb_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" ADD CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d" FOREIGN KEY ("tbAddressesId") REFERENCES "tb_addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" DROP CONSTRAINT "FK_a3dfceaedb2d5870b83356c5f5d"`);
        await queryRunner.query(`ALTER TABLE "tb_persons_addresses" DROP CONSTRAINT "FK_7be5b8faadb863b9cb17435c61a"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases_coupons" DROP CONSTRAINT "FK_87d36bdfd59dd6885cc01ebde7f"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3"`);
        await queryRunner.query(`ALTER TABLE "tb_addresses" DROP CONSTRAINT "FK_6dafc292779632e155ff084e5ad"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_f0dc0d17f29a844a6089e0aef86"`);
        await queryRunner.query(`ALTER TABLE "tb_persons" DROP CONSTRAINT "FK_16c3a260805188fc6bdb85d63df"`);
        await queryRunner.query(`ALTER TABLE "tb_phones" DROP CONSTRAINT "FK_26973d11e13ec316b40eae12f6e"`);
        await queryRunner.query(`ALTER TABLE "tb_item_carts" DROP CONSTRAINT "FK_6198283317c14c90c8ff69fd2f6"`);
        await queryRunner.query(`ALTER TABLE "tb_purchases" DROP CONSTRAINT "FK_7d165883b8356c6ae404820de7e"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677"`);
        await queryRunner.query(`ALTER TABLE "tb_carts_items" DROP CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_26d44dc906b92c061a6320cd850"`);
        await queryRunner.query(`ALTER TABLE "tb_cards" DROP CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3dfceaedb2d5870b83356c5f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7be5b8faadb863b9cb17435c61"`);
        await queryRunner.query(`DROP TABLE "tb_persons_addresses"`);
        await queryRunner.query(`DROP TABLE "coupom"`);
        await queryRunner.query(`DROP TABLE "tb_purchases_coupons"`);
        await queryRunner.query(`DROP TABLE "tb_addresses"`);
        await queryRunner.query(`DROP TABLE "tb_persons"`);
        await queryRunner.query(`DROP TABLE "tb_users"`);
        await queryRunner.query(`DROP TABLE "tb_phones"`);
        await queryRunner.query(`DROP TABLE "tb_genders"`);
        await queryRunner.query(`DROP TABLE "tb_item_carts"`);
        await queryRunner.query(`DROP TABLE "tb_purchases"`);
        await queryRunner.query(`DROP TABLE "tb_carts_items"`);
        await queryRunner.query(`DROP TABLE "tb_products"`);
        await queryRunner.query(`DROP TABLE "tb_cards"`);
        await queryRunner.query(`DROP TABLE "tb_brands"`);
        await queryRunner.query(`DROP TABLE "tb_places_types"`);
        await queryRunner.query(`DROP TABLE "tb_addresses_types"`);
    }

}
