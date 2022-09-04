import Domain from "../models/Domain";

export interface IValidate{
    validate(entity: Domain): Promise<void>;
}