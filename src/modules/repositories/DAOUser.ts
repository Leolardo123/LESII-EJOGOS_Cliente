import { UserRolesEnum } from "@modules/models/users/enum/UserRolesEnum";
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

    insert = async  (entity: User): Promise<User> => {
        if(!this.client){
            this.client = await pool.connect();
            await this.client.query('BEGIN');
        }
        try{
            const { rows: [ item ] } = await this.client.query(`
                INSERT INTO ${this.table} (email, password, role, is_active) VALUES (
                    '${entity.email}', 
                    '${entity.password}', 
                    '${UserRolesEnum.default}', 
                    'true'
                ) RETURNING id` 
            );
            entity.id = Number(item.id)
            if(entity.person){
                const daoPerson = new DAOPerson(false);
                await daoPerson.setConnection(this.client);
                await daoPerson.insert(entity)
            }
            return entity;
        } catch(err){
            await this.client.query('ROLLBACK');
            this.closeConnection();
            throw Error(err as string);
        } finally {
            if(this.ctrlTransaction){
                try{
                    await this.client.query('COMMIT');
                    this.client.release();
                    this.closeConnection()
                } catch(err){
                    await this.client.query('ROLLBACK');
                    this.closeConnection();
                    throw Error(err as string);
                }
            }
        }
    }
    
    find = async  (where: string): Promise<User[]> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        const result = await this.client.query(
            `SELECT 
                tb_users.*, 
                to_json(tb_persons.*) as person,
                to_json(array_agg(tb_addresses.*)) as addresses
            FROM 
                ${this.table}
            LEFT JOIN 
                tb_persons 
                ON tb_users.id = tb_persons.user_id
            LEFT JOIN 
                tb_person_addresses 
                ON tb_persons.id = tb_person_addresses.person_id
            LEFT JOIN 
                (SELECT * FROM tb_addresses) as tb_addresses 
                ON tb_person_addresses.address_id = tb_addresses.id
            ${where}
            GROUP BY
                tb_users.id, tb_persons.*`
        );
        this.client.release();
        this.closeConnection();
        return result.rows;
    }


    update = async  (entity: User): Promise<User> => {
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
            return entity;
        } catch(err){
            await this.client.query('ROLLBACK');
            this.client.release();
            this.closeConnection();
            throw new Error(err as string);
        } finally {
            if(this.ctrlTransaction){
                await this.client.query('COMMIT');
                this.client.release();
                this.closeConnection()
            }
        }
    }
}