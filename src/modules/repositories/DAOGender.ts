import Gender from "@modules/models/users/Gender";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOGender implements IDAO {
    async insert(entity: Gender): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            INSERT INTO tb_genders (name) VALUES (
                '${entity.name}', 
            )`
        );
        await connection.end();
    }

    async find(entity: Gender): Promise<Gender[]> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = await connection.query(
            `SELECT * FROM tb_genders ${where}`
        );
        await connection.end();
        return result.rows;
    }

    async update(entity: Gender): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            UPDATE tb_genders SET
                name = '${entity.name}',
            WHERE id = ${entity.id}
        `);
        await connection.end();
    }

    async remove(entity: Gender): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            DELETE FROM tb_genders WHERE id = ${entity.id}
        `);
        await connection.end();
    }
}