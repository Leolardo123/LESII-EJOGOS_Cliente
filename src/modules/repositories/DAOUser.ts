import User from "@modules/models/users/User";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOUser implements IDAO {
    private connection: any;

    insert(entity: User): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            INSERT INTO tb_users (email, password, role, isActive) VALUES (
                '${entity.email}', 
                '${entity.password}', 
                '${entity.role}', 
                '${entity.isActive}'
            )`
        );
        this.connection.end();
    }

    find(entity: User): User[] {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = this.connection.query(
            `SELECT * FROM tb_users ${where}`
        );
        this.connection.end();
        return result.rows;
    }

    update(entity: User): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            UPDATE tb_users SET
                email = '${entity.email}',
                password = '${entity.password}',
                role = '${entity.role}'
                isActive = ${entity.isActive}
            WHERE id = ${entity.id}
        `);
        this.connection.end();
    }

    remove(entity: User): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            DELETE FROM tb_users WHERE id = ${entity.id}
        `);
        this.connection.end();
    }
}