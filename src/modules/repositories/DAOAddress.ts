
import Address from "@modules/models/address/Address";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOAddress implements IDAO {
    private connection: any;

    insert(entity: Address): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            INSERT INTO tb_addresses (
                cep,
                number,
                city,
                state,
                country,
                complement,
                neighborhood,
                place,
                address_type_id,
                place_type_id,
            ) VALUES (
                ${entity.cep},
                ${entity.number},
                ${entity.city},
                ${entity.state},
                ${entity.country},
                ${entity.complement},
                ${entity.neighborhood},
                ${entity.place},
                ${entity.address_type.id},
                ${entity.place_type.id},
            )`
        );
        this.connection.end();
    }

    find(entity: Address): Address[] {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = this.connection.query(
            `SELECT * FROM tb_addresses ${where}`
        );
        this.connection.end();
        return result.rows;
    }

    update(entity: Address): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            UPDATE tb_addresses SET
                cep = ${entity.cep},
                number = ${entity.number},
                city = ${entity.city},
                state = ${entity.state},
                country = ${entity.country},
                complement = ${entity.complement},
                neighborhood = ${entity.neighborhood},
                place = ${entity.place},
                address_type_id = ${entity.address_type.id},
                place_type_id = ${entity.place_type.id},
            WHERE id = ${entity.id}
        `);
        this.connection.end();
    }

    remove(entity: Address): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            DELETE FROM tb_addresses WHERE id = ${entity.id}
        `);
        this.connection.end();
    }
}