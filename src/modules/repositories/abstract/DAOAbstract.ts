import Domain from "@modules/models/Domain";
import { pool } from "@shared/utils/connection";
import { PoolClient } from "pg";
import { IDAO } from "../interfaces/IDAO";

export abstract class DAOAbstract implements IDAO {
    protected table: string;
    protected ctrlTransaction: boolean;
    protected client: PoolClient | undefined;

    constructor(
        ctrlTransaction?: boolean
    ){
        this.ctrlTransaction = ctrlTransaction !== undefined 
                             ? ctrlTransaction : true;
    }

    setConnection = async (client: PoolClient) => {
        this.client = client;
    }

    closeConnection = () => {
        this.client = undefined;
    }

    insert(entity: Domain): Promise<void> {
        throw new Error('Serviço indisponível.')
    }

    update(entity: Domain): Promise<void> {
        throw new Error('Serviço indisponível.')
    }

    find = async  (where: string): Promise<Domain[]> => {
        if(!this.client){
            this.client = await pool.connect();
        }
        const result = await this.client.query(
            `SELECT * FROM ${this.table} ${where}`
        );
        this.client.release();
        this.closeConnection();
        return result.rows;
    }

    async remove(entity: Domain): Promise<void> {
        if(!this.client){
            this.client = await pool.connect();
            await this.client.query('BEGIN');
        }
        try{
            await this.client.query(`
                DELETE FROM ${this.table} WHERE id = ${entity.id}
            `);
        } catch (err) {
            await this.client.query('ROLLBACK');
            this.client.release();
            this.closeConnection();
            throw new Error(err as string)
        } finally {
            await this.client.query('COMMIT');
            if(this.ctrlTransaction) {
                this.client.release();
                this.closeConnection();
            }
        }
    }
}