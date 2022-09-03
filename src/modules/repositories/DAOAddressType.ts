
import AddressType from "@modules/models/address/AddressType";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOAddressType implements IDAO {
    private connection: any;

    insert(entity: AddressType): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            INSERT INTO tb_address_types (name) VALUES (
                '${entity.name}', 
            )`
        );
        this.connection.end();
    }

    find(entity: AddressType): AddressType[] {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = this.connection.query(
            `SELECT * FROM tb_address_types ${where}`
        );
        this.connection.end();
        return result.rows;
    }

    update(entity: AddressType): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            UPDATE tb_address_types SET
                name = '${entity.name}',
            WHERE id = ${entity.id}
        `);
        this.connection.end();
    }

    remove(entity: AddressType): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            DELETE FROM tb_address_types WHERE id = ${entity.id}
        `);
        this.connection.end();
    }
}