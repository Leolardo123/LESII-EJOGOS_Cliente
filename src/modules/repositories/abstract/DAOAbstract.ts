import Domain from "@modules/models/Domain";
import { pool } from "@shared/utils/connection";
import { PoolClient } from "pg";
import { IDAO } from "../interfaces/IDAO";

export abstract class DAOAbstract implements IDAO {
    protected table: string;
    protected ctrlTransaction: boolean;
    protected client: PoolClient;

    constructor(
        ctrlTransaction?: boolean
    ){
        this.ctrlTransaction = ctrlTransaction !== undefined 
                             ? ctrlTransaction : true;
    }

    setConnection = async (client: PoolClient) => {
        this.client = client;
    }

    insert(entity: Domain): Promise<void> {
        throw new Error('Serviço indisponível.')
    }

    update(entity: Domain): Promise<void> {
        throw new Error('Serviço indisponível.')
    }

    find(entity: Domain): Promise<Domain[]> {
        throw new Error('Serviço indisponível.')
    }

    async remove(entity: Domain): Promise<void> {
        try{
            if(!this.client){
            this.client = await pool.connect();
        }
            await this.client.query('BEGIN');
            await this.client.query(`
                DELETE FROM ${this.table} WHERE id = ${entity.id}
            `);
            this.client.release();
        } catch (err) {
            await this.client.query('ROLLBACK');
            throw new Error(err as string)
        } finally {
            await this.client.query('COMMIT');
        }
        if(this.ctrlTransaction) this.client.release()
    }
}