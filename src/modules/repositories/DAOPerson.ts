
import Person from "@modules/models/users/Person";
import { Connection } from "@shared/utils/connection";
import { IDAO } from "./interfaces/IDAO";

export class DAOPerson implements IDAO {
    private connection: any;

    insert(entity: Person): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            INSERT INTO tb_persons (name, cpf, cellphone, birth_date) VALUES (
                '${entity.name}', 
                '${entity.cpf}', 
                '${entity.cellphone}', 
                '${entity.birth_date}'
            )`
        );
        this.connection.end();
    }

    find(entity: Person): Person[] {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = this.connection.query(
            `SELECT * FROM tb_persons ${where}`
        );
        this.connection.end();
        return result.rows;
    }

    update(entity: Person): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            UPDATE tb_persons SET
                name = '${entity.name}',
                cpf = '${entity.cpf}',
                cellphone = '${entity.cellphone}',
                birth_date = '${entity.birth_date}'
            WHERE id = ${entity.id}
        `);
        this.connection.end();
    }

    remove(entity: Person): void {
        this.connection = new Connection().getConnectionPostgres();
        this.connection.connect();
        this.connection.query(`
            DELETE FROM tb_persons WHERE id = ${entity.id}
        `);
        this.connection.end();
    }

}