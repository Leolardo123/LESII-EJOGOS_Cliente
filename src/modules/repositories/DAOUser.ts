import User from "@modules/models/users/User";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOUser implements IDAO {
    private connection: any;

    async insert(entity: User): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            INSERT INTO tb_users (email, password, role, is_active) VALUES (
                '${entity.email}', 
                '${entity.password}', 
                '${entity.role}', 
                'true'
            )`
        );
        await connection.end();
    }

    async find(entity: User): Promise<User[]> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = await connection.query(
            `SELECT * FROM tb_users ${where}`
        );
        await connection.end();
        return result.rows;
    }

    async update(entity: User): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            UPDATE tb_users SET
                email = '${entity.email}',
                password = '${entity.password}',
                role = '${entity.role}'
                isActive = ${entity.isActive}
            WHERE id = ${entity.id}
        `);
        await connection.end();
    }

    async remove(entity: User): Promise<void> {
        const connection = new Connection().getConnectionPostgres();
        await connection.connect();
        await connection.query(`
            DELETE FROM tb_users WHERE id = ${entity.id}
        `);
        await connection.end();
    }
}