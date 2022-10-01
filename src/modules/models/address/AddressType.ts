import Domain from "../Domain";
import { Column, Entity, OneToMany } from 'typeorm'
import Address from "./Address";

@Entity('tb_addresses_types')
class AddressType extends Domain {
    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Address, address => address.address_type, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    address: Address

    constructor(
        type?: Partial<AddressType>
     ) {
         super();
         Object.assign(this, type)
     }
}

export default AddressType;