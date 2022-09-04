import Domain from "../Domain";

class PlaceType extends Domain {
    private _name: string;
    private _description: string;

    constructor(
        type?: Partial<PlaceType>
     ) {
         super();
         Object.assign(this, type)
     }
    public validate(): void {
        if(!this.name){
            throw new Error('Nome é um campo  obrigatório (Tipo de Logradouro).')
        }
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

export default PlaceType;