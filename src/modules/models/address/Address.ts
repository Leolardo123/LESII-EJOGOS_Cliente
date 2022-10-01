import Domain from "../Domain";
import AddressType from "./AddressType";
import PlaceType from "./PlaceType";
import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm'
import Person from "../users/Person";
import Purchase from "../sales/Purchase";
@Entity('tb_addresses')
class Address extends Domain {
    @Column({ default: '' })
    name: string;

    @Column()
    cep: string;

    @Column()
    number: number;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column({ nullable: true })
    complement?: string;

    @Column()
    neighborhood: string;

    @Column()
    place: string;

    @JoinColumn({ name: 'address_type_id' })
    @ManyToOne(() => AddressType, atype => atype.address, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    address_type: AddressType;

    @JoinColumn({ name: 'place_type_id' })
    @ManyToOne(() => PlaceType, ptype => ptype.address, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    place_type: PlaceType;

    @OneToMany(() => Purchase, purchase => purchase.payment_address, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    payment: Purchase;

    @OneToMany(() => Purchase, purchase => purchase.delivery_address, {
        onDelete: 'RESTRICT', onUpdate: 'CASCADE'
    })
    delivery: Purchase;

    @ManyToMany(() => Person, person => person.addresses, {
       onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    persons: Person[];

    constructor(
        address?: Partial<Address>
    ) {
        super();
        Object.assign(this, address)
    }
}

export default Address;