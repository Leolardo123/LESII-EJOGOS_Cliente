
import Address from "@modules/models/address/Address";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOAddress implements IDAO {
    async insert(entity: Address): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
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
        await connection.end();
    }

    async find(entity: Address): Promise<Address[]> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = await connection.query(
            `SELECT * FROM tb_addresses ${where}`
        );
        connection.end();
        return result.rows;
    }

    async update(entity: Address): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
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
        await connection.end();
    }

    async remove(entity: Address): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            DELETE FROM tb_addresses WHERE id = ${entity.id}
        `);
        await connection.end();
    }
}