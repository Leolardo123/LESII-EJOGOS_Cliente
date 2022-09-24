
import Card from "@modules/models/cards/Card";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOCard extends DAOAbstract<Card> {
    constructor() {
        super(Card);
    }
}