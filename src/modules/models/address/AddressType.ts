import Domain from "../Domain";

class AddressType extends Domain {
    private _name: string;
    private _description: string;

    constructor(
        type?: Partial<AddressType>
     ) {
         super();
         Object.assign(this, type)
     }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }
}

export default AddressType;