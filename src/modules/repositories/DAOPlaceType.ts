
import PlaceType from "@modules/models/address/PlaceType";
import { pool } from "@shared/utils/connection";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOPlaceType extends DAOAbstract {
    constructor(transaction?: boolean){
        super(transaction);
        this.table = 'tb_persons';
    }
    insert = async (entity: PlaceType): Promise<void> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        try{
            await this.client.query('BEGIN');
            await this.client.query(`
                INSERT INTO ${this.table} (name) VALUES (
                    '${entity.name}', 
                )`
            );
        } catch(err){
            await this.client.query('ROLLBACK');
            throw Error(err as string);
        } finally {
            if(this.ctrlTransaction){
                await this.client.query('COMMIT');
                this.client.release();
            }
        }
    }

    find = async (where: string): Promise<PlaceType[]> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        const result = await this.client.query(
            `SELECT * FROM ${this.table} ${where}`
        );
        this.client.release();
        return result.rows;
    }

    update = async (entity: PlaceType): Promise<void> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        try{
            await this.client.query('BEGIN');
            await this.client.query(`
                UPDATE ${this.table} SET
                    name = '${entity.name}',
                WHERE id = ${entity.id}
            `);
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