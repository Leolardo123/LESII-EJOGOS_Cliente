import Address from "../address/Address";
import Domain from "../Domain";
import Gender from "./Gender";
import Phone from "./Phone";

class Person extends Domain {
    private _name: string;
    private _cpf: string;
    private _birth_date: Date;
    private _phone: Phone;
    private _gender: Gender;
    private _addresses: Address[];

    constructor(
        person: Partial<Person>
    ) {
        super();
        Object.assign(this, person)
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public set cpf(value: string) {
        this._cpf = value;
    }

    public get phone(): Phone {
        return this._phone;
    }

    public set phone(value: Phone) {
        this._phone = value;
    }

    public get birth_date(): Date {
        return this._birth_date;
    }

    public set birth_date(value: Date) {
        this._birth_date = value;
    }

    public get gender(): Gender {
        return this._gender;
    }

    public set gender(value: Gender) {
        this._gender = value;
    }

    public get addresses(): Address[] {
        return this._addresses;
    }

    public set addresses(value: Address[]) {
        this._addresses = value;
    }
}

export default Person;