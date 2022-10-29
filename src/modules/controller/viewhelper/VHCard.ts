import Brand from "@modules/models/cards/Brand";
import Card from "@modules/models/cards/Card";
import Person from "@modules/models/users/Person";
import { ensureAuthenticated } from "@shared/utils/ensureAuthenticated";
import { Request } from "express";
import { VHAbstract } from "./VHAbstract";

export class VHCard extends VHAbstract {
    getEntity(req: Request): Card {
        const {
            brand_id,
            ...card
        } = req.body;
        const { id } = req.params;

        const userInfo = ensureAuthenticated(req);
        const person_id = userInfo.person ? userInfo.person : null;

        const cardInstance = new Card({ ...card });
        if (id) {
            Object.assign(cardInstance, { id: Number(id) });
        }

        if (person_id) {
            const personInstance = new Person();
            Object.assign(personInstance, { id: Number(person_id) });
            cardInstance.person = personInstance;
        } else {
            throw new Error('Cadastre os dados pessoais antes de cadastrar um cartão.');
        }

        if (brand_id) {
            const brandInstance = new Brand({ id: brand_id });
            cardInstance.brand = brandInstance;
        }

        return cardInstance;
    }
}