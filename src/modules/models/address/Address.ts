import { Entity } from "typeorm";
import Domain from "../users/Domain";
import AddressType from "./AddressType";
import PlaceType from "./PlaceType";

class Address extends Domain {
    private _cep: string;
    private _number: number;
    private _city: string;
    private _state: string;
    private _country: string;
    private _complement: string;
    private _neighborhood: string;
    private _place: string;
    private _address_type: AddressType;
    private _place_type: PlaceType;

    constructor(
        cep: string,
        number: number,
        city: string,
        state: string,
        country: string,
        complement: string,
        neighborhood: string,
        place: string,
        address_type: AddressType,
        place_type: PlaceType,
    ){
        super();
        this._cep = cep;
        this._number = number;
        this._city = city;
        this._state = state;
        this._country = country;
        this._complement = complement;
        this._neighborhood = neighborhood;
        this._place = place;
        this._address_type =  address_type;
        this._place_type = place_type;
    }

    public get cep(): string {
        return this._cep;
    }

    public set cep(value: string) {
        this._cep = value;
    }

    public get number(): number {
        return this._number;
    }

    public set number(value: number) {
        this._number = value;
    }

    public get city(): string {
        return this._city;
    }

    public set city(value: string) {
        this._city = value;
    }

    public get state(): string {
        return this._state;
    }

    public set state(value: string) {
        this._state = value;
    }

    public get country(): string {
        return this._country;
    }

    public set country(value: string) {
        this._country = value;
    }

    public get complement(): string {
        return this._complement;
    }

    public set complement(value: string) {
        this._complement = value;
    }

    public get neighborhood(): string {
        return this._neighborhood;
    }

    public set neighborhood(value: string) {
        this._neighborhood = value;
    }

    public get place(): string {
        return this._place;
    }

    public set place(value: string) {
        this._place = value;
    }

    public get address_type(): AddressType {
        return this._address_type;
    }

    public set address_type(value: AddressType) {
        this._address_type = value;
    }

    public get place_type(): PlaceType {
        return this._place_type;
    }

    public set place_type(value: PlaceType) {
        this._place_type = value;
    }
}

export default Address;