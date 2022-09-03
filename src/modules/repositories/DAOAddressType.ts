
import AddressType from "@modules/models/address/AddressType";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOAddressType implements IDAO {
    async insert(entity: AddressType): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            INSERT INTO tb_address_types (name) VALUES (
                '${entity.name}', 
            )`
        );
        await connection.end();
    }

    async find(entity: AddressType): Promise<AddressType[]> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = await connection.query(
            `SELECT * FROM tb_address_types ${where}`
        );
        await connection.end();
        return result.rows;
    }

    async update(entity: AddressType): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            UPDATE tb_address_types SET
                name = '${entity.name}',
            WHERE id = ${entity.id}
        `);
        await connection.end();
    }

    async remove(entity: AddressType): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            DELETE FROM tb_address_types WHERE id = ${entity.id}
        `);
        await connection.end();
    }
}