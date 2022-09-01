import Domain from "./Domain";
import Person from "./Person";

class User extends Domain {
    private _email: string;
    private _password: string;
    private _role: string;
    private _isActive: boolean;
    private _person: Person;

    constructor(
        role: string,
        email: string,
        password: string,
        person?: Person,
    ) {
        super();
        this._email = email;
        this._password = password;
        this._role = role;

        if (person) {
            this._person = person;
        }
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public set isActive(value: boolean) {
        this._isActive = value;
    }

    public get role(): string {
        return this._role;
    }

    public set role(value: string) {
        this._role = value;
    }

    public get person(): Person {
        return this._person;
    }

    public set person(value: Person) {
        this._person = value;
    }

}

export default User;