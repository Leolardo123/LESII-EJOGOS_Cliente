import Domain from "../Domain";

class Phone extends Domain {
    private _ddd: string;
    private _number: string;

    constructor(
        phone: Partial<Phone>
    ) {
        super();
        Object.assign(this, phone)
    }

    public get ddd(): string {
        return this._ddd;
    }

    public set ddd(value: string) {
        this._ddd = value;
    }

    public get number(): string {
        return this._number;
    }

    public set number(value: string) {
        this._number = value;
    }
}

export default Phone;