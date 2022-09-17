import Domain from "@modules/models/Domain";
import { DAOAbstract } from "../abstract/DAOAbstract";
import { DAOAddress } from "../DAOAddress";
import { DAOAddressType } from "../DAOAddressType";
import { DAOGender } from "../DAOGender";
import { DAOPerson } from "../DAOPerson";
import { DAOPlaceType } from "../DAOPlaceType";
import { DAOUser } from "../DAOUser";

class DAOFactory {
    static getDAO(type: string): DAOAbstract<Domain> {
        switch (type) {
            case "user":
                return new DAOUser();
            case "person":
                return new DAOPerson();
            case "gender": 
                return new DAOGender();
            case "address":
                return new DAOAddress();
            case "addresstype":
                return new DAOAddressType();
            case "placetype":
                return new DAOPlaceType();
            default:
                throw new Error("Tipo de pedido não encontrado");
        }
    }
}

export { DAOFactory };