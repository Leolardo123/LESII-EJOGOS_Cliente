import Gender from "@modules/models/users/Gender";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOGender implements IDAO {
    private connection: any;

    insert(entity: Gender): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            INSERT INTO tb_genders (name) VALUES (
                '${entity.name}', 
            )`
        );
        this.connection.end();
    }

    find(entity: Gender): Gender[] {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = this.connection.query(
            `SELECT * FROM tb_genders ${where}`
        );
        this.connection.end();
        return result.rows;
    }

    update(entity: Gender): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            UPDATE tb_genders SET
                name = '${entity.name}',
            WHERE id = ${entity.id}
        `);
        this.connection.end();
    }

    remove(entity: Gender): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            DELETE FROM tb_genders WHERE id = ${entity.id}
        `);
        this.connection.end();
    }
}