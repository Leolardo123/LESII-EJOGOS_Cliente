import { DAOAbstract } from "../abstract/DAOAbstract";
import { DAOAddress } from "../DAOAddress";
import { DAOAddressType } from "../DAOAddressType";
import { DAOBrand } from "../DAOBrand";
import { DAOCard } from "../DAOCard";
import { DAOCart } from "../DAOCart";
import { DAOCartItem } from "../DAOCartItem";
import { DAOGender } from "../DAOGender";
import { DAOPerson } from "../DAOPerson";
import { DAOPlaceType } from "../DAOPlaceType";
import { DAOProduct } from "../DAOProducts";
import { DAOUser } from "../DAOUser";

class DAOFactory {
    static getDAO(type: string): DAOAbstract<any> {
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
            case "card":
                return new DAOCard();
            case "brand": 
                return new DAOBrand();
            case "product":
                return new DAOProduct();
            case "cart":
                return new DAOCart();
            case "cartitem":
                return new DAOCartItem();
            default:
                throw new Error("Tipo de pedido não encontrado");
        }
    }
}

export { DAOFactory };