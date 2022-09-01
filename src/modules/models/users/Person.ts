import Domain from "./Domain";
import Gender from "./Gender";
import User from "./User";

class Person extends Domain {
    private _name: string;
    private _cpf: string;
    private _cellphone: string;
    private _birth_date: Date;
    private _gender: Gender;

    constructor(
        name: string,
        cpf: string,
        cellphone: string,
        birth_date: Date,
        gender: Gender,
    ) {
        super();
        this._name = name;
        this._cpf = cpf;
        this._cellphone = cellphone;
        this._birth_date = birth_date;
        this._gender = gender;
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

    public get cellphone(): string {
        return this._cellphone;
    }

    public set cellphone(value: string) {
        this._cellphone = value;
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
}

export default Person;