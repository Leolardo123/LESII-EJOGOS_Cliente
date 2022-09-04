import Domain from "../Domain";

class Gender extends Domain {
    private _name: string;

    constructor(
       gender?: Partial<Gender>
    ) {
        super();
        Object.assign(this, gender)
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}

export default Gender;