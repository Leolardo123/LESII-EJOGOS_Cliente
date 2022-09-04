
import Person from "@modules/models/users/Person";
import User from "@modules/models/users/User";
import { pool } from "@shared/utils/connection";
import { DAOAbstract } from "./abstract/DAOAbstract";
import { DAOPersonAddress } from "./DAOPersonAddress";

export class DAOPerson extends DAOAbstract {
    constructor(
        transaction?: boolean,
    ){
        super(transaction);
        this.table = 'tb_persons';
    }

    insert = async (entity: User): Promise<Person> =>  {
        const { person } = entity;
        if(!this.client){
            this.client = await pool.connect();
            await this.client.query('BEGIN');
        }
        try{
            const { rows: [ item ] } = await this.client.query(`
                INSERT INTO tb_persons (name, cpf, birth_date, gender_id,  user_id) VALUES (
                    '${person.name}', 
                    '${person.cpf}', 
                    '${person.birth_date}',
                    '${person.gender.id}',
                    '${entity.id}'
                ) RETURNING id`
            );
            person.id = Number(item.id);
            if(person.addresses){
                const daoPersonAddress = new DAOPersonAddress(false);
                await daoPersonAddress.setConnection(this.client);
                await daoPersonAddress.insert(person);
            }
            return person;
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

    update = async (entity: Person): Promise<Person> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        try{
            await this.client.query('BEGIN');
            await this.client.query(`
                UPDATE tb_persons SET
                    name = '${entity.name}',
                    cpf = '${entity.cpf}',
                    birth_date = '${entity.birth_date}',
                    gender_id = '${entity.gender.id}'
                WHERE id = ${entity.id}
            `);
            return entity;
        } catch(err){
            await this.client.query('ROLLBACK');
            this.client.release();
            this.closeConnection();
            throw Error(err as string);
        } finally {
            if(this.ctrlTransaction){
                await this.client.query('COMMIT');
                this.client.release();
                this.closeConnection();
            }
        }
    }
}