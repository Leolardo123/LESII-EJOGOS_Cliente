
import Person from "@modules/models/users/Person";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOPerson implements IDAO {
    async insert(entity: Person): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            INSERT INTO tb_persons (name, cpf, birth_date) VALUES (
                '${entity.name}', 
                '${entity.cpf}', 
                '${entity.birth_date}'
            )`
        );
        await connection.end();
    }

    async find(entity: Person): Promise<Person[]> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = await connection.query(
            `SELECT * FROM tb_persons ${where}`
        );
        await connection.end();
        return result.rows;
    }

    async update(entity: Person): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            UPDATE tb_persons SET
                name = '${entity.name}',
                cpf = '${entity.cpf}',
                birth_date = '${entity.birth_date}'
            WHERE id = ${entity.id}
        `);
        await connection.end();
    }

    async remove(entity: Person): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            DELETE FROM tb_persons WHERE id = ${entity.id}
        `);
        await connection.end();
    }

}