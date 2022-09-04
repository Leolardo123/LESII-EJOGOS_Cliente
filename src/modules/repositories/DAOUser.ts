import User from "@modules/models/users/User";
import { pool } from "@shared/utils/connection";
import { DAOAbstract } from "./abstract/DAOAbstract";
import { DAOPerson } from "./DAOPerson";

export class DAOUser extends DAOAbstract {
    constructor(
        transaction?: boolean,
    ){
        super(transaction);
        this.table = 'tb_users';
    }

    insert = async  (entity: User): Promise<void> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        try{
            await this.client.query('BEGIN');
            const { rows: [ item ] } = await this.client.query(`
                INSERT INTO ${this.table} (email, password, role, is_active) VALUES (
                    '${entity.email}', 
                    '${entity.password}', 
                    '${entity.role}', 
                    'true'
                ) RETURNING id` 
            );
            entity.id = Number(item.id)
            if(entity.person){
                const daoPerson = new DAOPerson(
                    false
                );
                daoPerson.setConnection(this.client);
                await daoPerson.insert(entity)
            }
        } catch(err){
            await this.client.query('ROLLBACK');
            this.client.release();
            throw Error(err as string);
        } finally {
            if(this.ctrlTransaction){
                await this.client.query('COMMIT');
                this.client.release();
            }
        }
    }

    find = async  (entity: User): Promise<User[]> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = await this.client.query(
            `SELECT * FROM ${this.table} ${where}`
        );
        this.client.release();
        return result.rows;
    }

    update = async  (entity: User): Promise<void> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        try{
            await this.client.query('BEGIN');
            await this.client.query(`
                UPDATE ${this.table} SET
                    email = '${entity.email}',
                    password = '${entity.password}',
                    role = '${entity.role}'
                    isActive = ${entity.isActive}
                WHERE id = ${entity.id}
            `);
            if(entity.person){
                const daoPerson = new DAOPerson(false);
                await daoPerson.update(entity.person)
            }
        } catch(err){
            await this.client.query('ROLLBACK');
            this.client.release();
        } finally {
            if(this.ctrlTransaction){
                await this.client.query('COMMIT');
                this.client.release();
            }
        }
    }
}