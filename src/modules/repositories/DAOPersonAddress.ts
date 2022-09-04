
import Person from "@modules/models/users/Person";
import { pool } from "@shared/utils/connection";
import { DAOAbstract } from "./abstract/DAOAbstract";
import { DAOAddress } from "./DAOAddress";

export class DAOPersonAddress extends DAOAbstract {
    constructor(
        transaction?: boolean,
    ){
        super(transaction);
        this.table = 'tb_person_addresses';
    }

    insert = async (entity: Person): Promise<Person> => {
        if(!this.client){
            this.client = await pool.connect();
            await this.client.query('BEGIN');
        }
        try{
            const daoAddress = new DAOAddress(false);
            daoAddress.setConnection(this.client);
            if(entity.addresses){
                entity.addresses.map(async (address) => {
                    try{
                        const createdAddress = await daoAddress.insert(address);
                        await this.client.query(`
                            INSERT INTO tb_person_addresses (
                                person_id,
                                address_id
                            ) VALUES (
                                '${entity.id}',
                                '${createdAddress.id}'
                            )`
                        )
                    } catch(err){
                        throw Error(err as string);
                    }
                })
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
}