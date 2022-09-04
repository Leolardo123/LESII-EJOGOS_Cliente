
import Address from "@modules/models/address/Address";
import { pool } from "@shared/utils/connection";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOAddress extends DAOAbstract {
    constructor(
        transaction?: boolean,
    ){
        super(transaction);
        this.table = 'tb_addresses';
    }

    insert = async (entity: Address): Promise<void> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        try{
            await this.client.query('BEGIN');
            await this.client.query(`
            INSERT INTO tb_addresses (
                cep,
                number,
                city,
                state,
                country,
                complement,
                neighborhood,
                place,
                address_type_id,
                place_type_id,
            ) VALUES (
                ${entity.cep},
                ${entity.number},
                ${entity.city},
                ${entity.state},
                ${entity.country},
                ${entity.complement},
                ${entity.neighborhood},
                ${entity.place},
                ${entity.address_type.id},
                ${entity.place_type.id},
            )`
        );
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

    find = async (entity: Address): Promise<Address[]> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        const where = entity.id ? `WHERE id = ${entity.id}` : "";
        const result = await this.client.query(
            `SELECT * FROM tb_addresses ${where}`
        );
        this.client.release();
        return result.rows;
    }

    update = async (entity: Address): Promise<void> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        try{
            this.client.query('BEGIN');
            await this.client.query(`
                UPDATE tb_addresses SET
                    cep = ${entity.cep},
                    number = ${entity.number},
                    city = ${entity.city},
                    state = ${entity.state},
                    country = ${entity.country},
                    complement = ${entity.complement},
                    neighborhood = ${entity.neighborhood},
                    place = ${entity.place},
                    address_type_id = ${entity.address_type.id},
                    place_type_id = ${entity.place_type.id},
                WHERE id = ${entity.id}
            `);
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
}